export function GetRacesURL(year: string, code?: string | undefined): string {
    if (code) {
        const url = `https://www.formula1.com/en/results.html/${year}/races/${code}/race-result.html`;

        return url
    }

    return `https://www.formula1.com/en/results.html/${year}/races.html`
}

export function GetDriversURL(year: string, code?: string | undefined): string {
    if (code) {
        const url = `https://www.formula1.com/en/results.html/${year}/drivers/${code}.html`;

        return url
    }

    return `https://www.formula1.com/en/results.html/${year}/drivers.html`
}

export function GetTeamsURL(year: string, code?: string | undefined): string {
    if (code) {
        const url = `https://www.formula1.com/en/results.html/2023/team/${code}.html`;

        return url
    }

    return `https://www.formula1.com/en/results.html/${year}/team.html`
}