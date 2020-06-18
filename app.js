const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const moment=require('moment');
const app = express()
require('dotenv').config()

const apiKey = process.env.API_KEY;
const port=process.env.PORT||3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    request(url, function (err, response, body) {
      if(err){
        res.render('index', {gallery: null, error: 'Error, please try again',moment:moment});
      } else {
        let gallery = JSON.parse(body);
       console.log(gallery);
        if(gallery == undefined){
          res.render('index', {gallery: null, error: 'Error, please try again',moment:moment});
        } else {
          res.render('index', {gallery:gallery, error: null,moment:moment});
        }
      }
    });
})

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
})