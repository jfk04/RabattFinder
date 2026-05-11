import axios from "axios";
import * as cheerio from "cheerio";
import fs from 'fs';

export const scrapeShop = async (shop) => {
    axios(`https://www.aktionspreis.de/prospekt/${shop}-angebote`)
    .then(res => {
        const htmlData = res.data;
        const $ = cheerio.load(htmlData);
        const products = [];

        $('.w3-col.s9', htmlData).each((index, element) => {
            const name = $(element).find('[title]').attr('title');
            const price = $(element).find('span b').text();
            //Prüfen, ob Produkt + Shop schon in der Liste
            if(!products.some(p => p.name === name && p.shop === shop)){
            products.push({
                name,
                price,
                shop,
                index
            })}
        })
        //Metadaten + Prdukte
        fs.writeFileSync(`${shop}_angebote.json`, JSON.stringify({
            _lastScraped: new Date().toLocaleString('de-DE'),
            _shop: shop,
            _productCount: products.length,
            products

        }, null, 2));
        console.log(`${shop} erfolgreich gescraped`);
    }).catch(err => console.error(err));
}

function getJSONFiles(){
    //Alle json Files, in denen Angebote stehen auflisten
    const files = fs.readdirSync("./");
    const angebotFiles = files.filter(file =>
        file.includes("angebot") && file.endsWith(".json")
    );
    return angebotFiles;
}

function searchJSON(file, product, angebotsListe){
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));
    const result = data.products.filter(item => 
        item.name.toLowerCase().includes(product.toLowerCase())
    );
    angebotsListe.push(...result);
}

export function searchProduct(product){
    let angebotsListe = []
    const files = getJSONFiles();
    files.forEach(file => 
        searchJSON(file, product, angebotsListe)
    );
    console.log(angebotsListe);
    return angebotsListe
}