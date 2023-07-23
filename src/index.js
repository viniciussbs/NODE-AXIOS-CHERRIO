const logger = require('./logger')('index');
const geTeamPageScraper = require('./scrapers/ge/team-page');

async function run () {
    const result = await geTeamPageScraper.scrape('Botafogo');  
    logger.log(result);
};

run();

