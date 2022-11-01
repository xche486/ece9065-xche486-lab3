const {Router} = require("express");
const express = require("express");
const mysql = require('mysql');
const cors = require('cors')
const app = express();
const port = 3000;
const router = express.Router();
app.use(cors())


//static front end
app.use('/', express.static('static'))

//middleware
app.use((req,res,next)=>{ // for all routes
    console.log(`${req.method} requests for ${req.url}`);
    next();//working for next route (log)
});

//router 
app.use('/api/', router);//install router at this location

//database connection  
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Axy2436.",
    database: "lab3"
});

//get all available genre names, IDs and parent IDs
router.get('/genres',(req, res)=> {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    condition ="SELECT title as names, genre_id as IDs, parent as Parent_IDs FROM genres" 
    con.query(condition , function (err , genres, fields) {
      if (err) throw err;
      //console.log(result)
      res.send(genres);
    });
  }); 
});


//get specific artist information 
router.get('/artists/:artist_id',(req, res)=> {
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      condition ="SELECT artist_id, artist_comments, artist_favorites, artist_handle, artist_name,artist_url, tags FROM raw_artists" ;
      con.query(condition , function (err , artists, fields) {
        if (err) throw err;
        //console.log(result)
        const id = req.params.artist_id;
        const artist = artists.find( a => a.artist_id === parseInt(id));
        if (artist){
            res.send(artist);
        }
        else {
            res.status(404).send(`GET requests for ${id} cannot be found`)
        };
      });
    }); 
});

//get following details for a given track id
router.get('/artists/:artist_id',(req, res)=> {
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      condition ="SELECT artist_id, artist_comments, artist_favorites, artist_handle, artist_name,artist_url, tags FROM raw_artists" ;
      con.query(condition , function (err , artists, fields) {
        if (err) throw err;
        //console.log(result)
        const id = req.params.artist_id;
        const artist = artists.find( a => a.artist_id === parseInt(id));
        if (artist){
            res.send(artist);
        }
        else {
            res.status(404).send(`GET requests for ${id} cannot be found`)
        };
      });
    }); 
});


  /* //normal get
router.get('/', (req,res) =>{
    res.send(genres);
});
 */
/* //get all available genre names, IDs and parent IDs
var limited_genres =[];
router.get('/:item1',(req, res)=> {
//    item = genres[0];
//    console.log(item);
//    console.log(genres.length);
    var index = 0;
     while ( index < genres.length) {
        //console.log({'names' : genres[index].title, 'ID' : genres[index].genre_id, 'Parent ID': genres[index].parent})
        limited_genres.push({'names' : genres[index].title, 'ID' : genres[index].genre_id, 'Parent ID': genres[index].parent});
        index += 1 ;
    }
     res.send(limited_genres);
});
 */

/* router.get('/:item2',(req, res)=> {
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
 */
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
