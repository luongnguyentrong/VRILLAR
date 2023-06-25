import * as cheerio from 'cheerio';

export function tableToJson($: cheerio.CheerioAPI, table: cheerio.Cheerio<cheerio.Element>): Array<Record<string, cheerio.Cheerio<cheerio.Element>>> {
    const headers = table.find("thead tr th").map((idx, ele) => {
        return $(ele).text()
    })

    const data = []

    const body = table.find("tbody tr").map((_, row) => {
        const cols = $(row).find("td")

        const new_data = {}

        cols.each((idx, col) => {
            if (headers[idx] != '') {
                new_data[headers[idx]] = col
            }
        })

        data.push(new_data)
    })

    return data
}

function extract_race_code(url: string) {
    url = url.slice(0, -5)

    const parts = url.split('/');

    const raceId = parts[5];
    const raceCode = parts[6];

    return `${raceId}/${raceCode}`;
}

function toSnakeCase(str: string) {
    return str.replace(/\s+/g, '_').toLowerCase();
}


// parse cheerio array table object to API response 
export function output($: cheerio.CheerioAPI, data: Array<Record<string, cheerio.Cheerio<cheerio.Element>>>): Array<Record<string, String | Number>> {
    const new_data = data.map(row => {
        const new_row = {}

        for (const col in row) {
            const col_key = toSnakeCase(col)

            if (col === "Grand Prix") {
                new_row["race_code"] = extract_race_code($(row[col]).find("a").attr("href"))
            }

            if (col !== "Driver" && col !== "Winner") {
                if (col === "Laps")
                    new_row[col_key] = Number($(row[col]).text().trim())
                else if (col === "No")
                    new_row[col_key] = Number($(row[col]).text().trim())
                else if (col === "PTS")
                    new_row[col_key] = Number($(row[col]).text().trim())
                else
                    new_row[col_key] = $(row[col]).text().trim()
            }
            else {
                new_row[col_key] = $(row[col]).find(".hide-for-tablet").text().trim() + " " + $(row[col]).find(".hide-for-mobile").text().trim()
            }
        }

        return new_row
    })


    return new_data
}