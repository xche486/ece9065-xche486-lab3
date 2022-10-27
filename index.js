const {Router} = require("express");
const express = require("express");
const file = require("fs");
let csvToJson = require('convert-csv-to-json');
const app = express();
const port = 3000;
const router = express.Router();


genres= csvToJson.fieldDelimiter(',').getJsonFromCsv("lab3-data/genres.csv"); 
//https://iuccio.github.io/csvToJson/#generate-array-of-object-in-json-format
raw_albums= csvToJson.fieldDelimiter(',').getJsonFromCsv("lab3-data/raw_albums.csv"); 
raw_tracks= csvToJson.fieldDelimiter(',').getJsonFromCsv("lab3-data/raw_tracks.csv"); 
raw_artists= csvToJson.fieldDelimiter(',').getJsonFromCsv("lab3-data/raw_artists.csv"); 



//static front end
app.use('/', express.static('static'))

//middleware
app.use((req,res,next)=>{ // for all routes
    console.log(`${req.method} requests for ${req.url}`);
    next();//working for next route (log)
});

//router 
app.use('/api/', router);//install router at this location


//normal get
router.get('/', (req,res) =>{
    res.send(genres);
});

//get all available genre names, IDs and parent IDs
router.get('/:item1',(req, res)=> {
    for (item in genres){
        delete myObj.genres.[""];
        delete myObj.genres.#tracks;

    res.send();
});

router.get('/:item1',(req, res)=> {
    const id =req.params.item1;
    //validate
    const track = genres.find( genre => genre.track_id === parseInt(id));
    if (track){
        res.send(track);
    }
    else {
        res.status(404).send(`GET requests for ${id} cannot be found`)
    }
})

//get specific part
/* router.get('/:track_id',(req, res)=> {
     const id =req.params.track_id;
     //validate
     const track = genres.find( p => p.track_id === parseInt(id));
     if (track){
         res.send(track);
     }
     else {
         res.status(404).send(`GET requests for ${id} cannot be found`)
     }
}) */


app.listen(port, () => {
    console.log(`listening to port ${port}`)
});
