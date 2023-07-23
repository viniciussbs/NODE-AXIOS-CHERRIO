const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../logger')('ge/team-page');

const recebeURL = async (url) => {
    const result = await axios.get(url)
    return result.data;
}

exports.main = async () => {
    logger.log('Starting...');

    const conteudoDaUrl = await recebeURL("https://ge.globo.com/futebol/times/botafogo/")
    const $ = cheerio.load(conteudoDaUrl)

    /*const exibeDados = $('h1').text()*/
    /*const exibeDados = $('h2').text()*/
    /*const exibeDados = $('title').text()
    console.log(exibeDados);*/


    //Função que encontra links de materia e retora com os links ordenados
    /*$('h2').each((i, e) => {
        console.log(`O h2 na posição ${i} tem o valor igual a: ${$(e).text()}`);
    })*/

    let materias = []

    //Função que acessa os links e extrai titulos e subtitulos
    $('h2').each((i, e) => {
        //informar o caminiha ate o chegar ao a e pega o valor do texto que esta nele
        const tituloMateria= $(e).find('a > ul> li > div > div > h2').text();
        const subtituloMateria = "https://ge.globo.com/futebol/times/botafogo/" + $(e).find('li > div > div > span').attr("src");

        //Criando um obj com o valores a serem retornados 
        const data = { tituloMateria, subtituloMateria}
        materias.push(data);

    })

    logger.log('Finished.');
}
