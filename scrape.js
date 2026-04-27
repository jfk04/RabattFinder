import puppeteer from "puppeteer";
import fs from 'fs';

const scrapeShop = async (shop) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = `https://www.aktionspreis.de/prospekt/${shop}-angebote`;

    await page.goto(url);

    const artikel = await page.evaluate((shop) => {
        const els = document.querySelectorAll('.w3-col.s9');
        return Array.from(els).map(el =>{
            const name = el.querySelector('[title]').getAttribute('title');
            const price = el.querySelector('span b').textContent;

            return {
                name: name,
                price: price,
                shop: shop,
            }
        });
    }, shop);

    fs.writeFileSync(`${shop}_angebote.json`, JSON.stringify(artikel, null, 2));
    console.log(`${shop} erfolgreich gescraped`);

    await browser.close();
}

function getJSONFiles(){
    const files = fs.readdirSync("./");
    const angebotFiles = files.filter(file =>
        file.includes("angebot") && file.endsWith(".json")
    );
    return angebotFiles;
}

function searchJSON(file, product, angebotsListe){
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));
    const result = data.filter(item => 
        item.name.toLowerCase().includes(product)
    );
    angebotsListe.push(...result);
}

export function searchProduct(product){
    let angebotsListe = []
    const files = getJSONFiles();
    files.forEach(file => 
        searchJSON(file, product, angebotsListe)
    );
    return angebotsListe
}

scrapeShop('lidl');
scrapeShop('rewe');
scrapeShop('aldi-sued');
//scrapeShop('norma');