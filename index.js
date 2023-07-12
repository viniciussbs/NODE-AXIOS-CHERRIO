const axios = require('axios');
const cheerio = require('cheerio');

const fetchData = async (url) => {
    const result = await axios.get(url)
    return result.data;
}

const main = async () => {
    const content = await fetchData("https://stardewvalleywiki.com/Villagers")
    const $ = cheerio.load(content)
    let villagers = []

    //Pega o texto dentro do seletor no caso o H1
    /*const title = $('h1').text()
            console.log(title);*/
    
    /*$('h2').each((i, e) => {
        console.log(`O h2 na posição ${i} tem o valor igual a: ${$(e).text()}`);    
    })*/

    $('li.gallerybox').each((i, e) => {
        //informar o caminiha ate o chegar ao a e pega o valor do texto que esta nele
        const title = $(e).find('.gallerytext > p > a').text();
        const avatar = "https://stardewvalleywiki.com" + $(e).find('.thumb > div > a > img').attr("src");
        const link = "https://stardewvalleywiki.com" + $(e).find('.gallerytext > p > a').attr("href");
        
        //Criando um obj com o valores a serem retornados 
        const data = { title, avatar, link }
        villagers.push(data);
      
    })

    console.log(villagers);

}

main();