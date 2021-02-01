const express = require('express');

const app = express();

const {config} = require('./config/index');

const moviesApi = require ('./routes/movies.js')



//  challenge
app.get('/bisiesto/:year', (req,res) =>{

    const year = req.params.year;
    if(year % 4 === 0){
        res.send(`El año ${year} es bisiesto`)
    } else {
        res.send(`El año ${year} no es bisiesto`)
    } 
})



app.listen(config.port, function(){
    console.log(`Listening http://localhost:${config.port}`)
});