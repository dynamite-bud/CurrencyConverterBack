const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const axios = require('axios').create({
    baseURL: 'https://openexchangerates.org/api',
    params: {
        app_id: "149de99199f042d5bc79e960c2615621"
    }
  });



const app = express();
const port = 8080;

// Where we will keep books
let CurrencyRates = {};

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.get('')

app.get('/convert/:from/:to', async (req, res) => {
    axios.get('/latest.json')
        .then((response) =>{
            CurrencyRates=response.data.rates;
            let fromCurrency=parseFloat(CurrencyRates[req.params.from]);
            let toCurrency=parseFloat(CurrencyRates[req.params.to]);
            let value=1;
            const ans=(value*toCurrency)/fromCurrency;
            if(ans!=null && ans>=0){
                res.status(200);
                res.json((value*toCurrency)/fromCurrency);                
            }else{
                res.status(401).send('Conversion Error');
            }
        })
        .catch((error) =>{
            res.status(401).send('Conversion Error');
        });
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));