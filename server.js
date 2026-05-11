import express from 'express'; 
import {searchProduct, scrapeShop} from './scrape.js';
import cron from 'node-cron';

const app = express();
const PORT = process.env.PORT || 3000;
const SHOPS = ['lidl', 'rewe', 'aldi-sued'];

// Test Route
app.get('/', (req, res) => {
    res.send('Server läuft!');
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf auf Port ${PORT}`);
});

// API bauen
app.get('/angebote', async (req, res) => {
    //Suchbegriff aus der Query holen
    //Webanfrage : http://DEIN-SERVER:3000/angebote?suche=red%20bull
    const suchbegriff = req.query.suche?.toLowerCase();
    console.log(suchbegriff);
    const angebotsListe = searchProduct(suchbegriff);
    console.log(angebotsListe);
    res.json(angebotsListe)
})

// Jeden Montag um 06:00 Uhr
cron.schedule('0 6 * * 1', async () => {
    console.log('Starte wöchentliches Scraping...');
    for (const shop of SHOPS) {
        await scrapeShop(shop);
    }
    console.log('Scraping abgeschlossen!');
});