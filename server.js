import express from 'express'; 
import {searchProduct} from './scrape.js';

const app = express();
const PORT = process.env.PORT || 3000;

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
    const suchbegriff = req.query.suche?.toLowerCase() || '';
    console.log(suchbegriff);
    const angebotsListe = searchProduct(suchbegriff);
    console.log(angebotsListe);
    res.json(angebotsListe)
})