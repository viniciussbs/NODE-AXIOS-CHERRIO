const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../logger')('ge/team-page');

exports.scrape = async (team) => {
    logger.log(`Started scraping ${team} page...`);

    const { $, response } = await fetchTeamPageData(team.toLowerCase());
    const { headlines, otherArticles } = await parse($, response);

    logger.log(`Finished scraping ${team} page.`);

    return { headlines, otherArticles };
};

async function fetchTeamPageData (team) {
    const response = await axios.get(`https://ge.globo.com/futebol/times/${team}/`);
    const $ = cheerio.load(response.data);

    return { $, response };
}

async function parse ($) {
    function getURL () {
        return $(this).prop('href');
    }

    const $headlines = $('.bstn-hl-link').map(getURL);
    const $otherArticles = $('.feed-post-link').map(getURL);

    // TODO: pegar headlines
    // Quando a página é carregada, existe esse markup pra cada headline:
    //
    //      <div class="glb-skeleton-container"><div class="bstn-headline-skeleton glb-skeleton-box"></div></div>
    //
    // Depois de carregada, as headlines são carregadas por JS, que substitui esse markup pelo conteúdo real.
    // Pra pegar esses dados, vamos precisar entender de onde esse dado vem.
    //
    // Como fiz pra reproduzir:
    // 
    // 1. fiz log da tag <main> e vi que foi retornada
    // 2. fui adentrando 1 nível de cada vez até que nada mais fosse retornado
    // 3. ao fazer log de <div clas="bstn-hl">, vi que estava sendo retornado um markup diferente do esperado

    // DEBUG:
    logger.debug($('.bstn-hl').html());

    return {
        headlines: Array.from($headlines),
        otherArticles: Array.from($otherArticles)
    };
}


