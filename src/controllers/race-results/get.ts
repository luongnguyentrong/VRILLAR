import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Race } from 'orm/entities/races/Race';
import { Ranking } from 'orm/entities/races/Ranking';
import axios from 'axios';
import { GetDriversURL, GetRacesURL, GetTeamsURL } from './api'
import * as cheerio from 'cheerio';
import { tableToJson, output } from 'utils/cheerio'

function get_url(filter: string, year: string, code?: string) {
    let url: string
    if (filter === "races")
        url = GetRacesURL(year, code)
    else if (filter === "drivers")
        url = GetDriversURL(year, code)
    else
        url = GetTeamsURL(year, code)

    return url
}

// get specific race info
async function get_data(filter: string, year: string, code?: string) {
    // get url of filter
    const url = get_url(filter, year, code)

    // fetch html page
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // parse table 
    const table_tag = $("body > div.site-wrapper > main > article > div > div.ResultArchiveContainer > div.resultsarchive-wrapper table")
    const table_data = tableToJson($, table_tag)

    // convert cheerio object to data
    const result = output($, table_data)

    return result
}

function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
}

interface IRequestParams {
    year: string
    filter: string
}

interface IQuery {
    code: string
}

export const getRaceResults = async (req: Request<IRequestParams, {}, {}, IQuery>, res: Response, next: NextFunction) => {
    // get url params
    const { year, filter } = req.params

    // get uri query
    const { code } = req.query;

    try {
        if (!year || !isNumeric(year) || !['races', 'drivers', 'teams'].includes(filter)) {
            res.status(400).send("Invalid input")
        }

        if (code && typeof code !== 'string')
            res.status(400).send("Invalid input")

        // fetch data and parse into object
        const data = await get_data(filter, year, code)

        try {
            // push fetched data to database
            if (filter === "races") {
                if (!code) {
                    // add year value to each row
                    const new_data = data.map(row => {
                        row.year = year

                        return row
                    })

                    const raceRepository = getRepository(Race);
                    await raceRepository.upsert(new_data, ["race_code", "year"])
                }
                else {
                    // add metadata: year, race_code value to each row
                    const new_data = data.map(row => {
                        row.year = year
                        row.race_code = code

                        row.time = row["time/retired"]
                        delete row["time/retired"]

                        return row
                    })

                    const raceRepository = getRepository(Ranking);

                    await raceRepository.upsert(new_data, ["race_code", "driver", "year"])
                }
            }
        } catch (err) {
            res.status(500).json({ error: 'An error occurred while saving results to database.' });
            return
        }

        // return crawled data
        res.json(data)
        return
    } catch (error) {
        console.error('Error retrieving race results:', error);
        res.status(500).json({ error: 'An error occurred while retrieving race results.' });
    }
};
