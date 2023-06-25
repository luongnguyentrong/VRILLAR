# VRILLAR ASSIGNMENT FOR THE POSITION OF BACKEND PROGRAMMER

[![CI][build-badge]][build-url]
[![TypeScript][typescript-badge]][typescript-url]
[![prettier][prettier-badge]][prettier-url]
![Heisenberg](misc/heisenberg.png)

This is a simple project to crawl data from https://www.formula1.com/, visit /swagger to view API documentation

**Note**: Results returned from API with filter races are saved to table `Races` and `Rankings` depending of the __code__ query. You can view these tables in PostgresSQL with user account defined in `.env` file.

For example: 
  - Results from http://localhost:4000/years/2022/races are save to table `Races`
  - Results from http://localhost:4000/years/2022/races?code=1124%2Fbahrain are save to table `Ranking`



## Requirements

- [Node v16+](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Running

_Easily set up a local development environment with single command!_

- clone the repo
- `npm run docker:dev` 🚀

Visit [localhost:4000/swagger](http://localhost:4000/swagger) to see API definitions
