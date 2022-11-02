const {Router} = require("express");
const express = require("express");
const { Pool, Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
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

app.use(bodyParser.json());

const con = new Pool({
    user: 'postgres',
    host: 'db.qlcnnpcecwjoarqzautb.supabase.co',
    database: 'postgres',
    password: 'hp0Li1VwztVOl6AW',
    port: 5432,
  })

//check db connection 
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


//get all available genre names, IDs and parent IDs
router.get('/genres',(req, res)=> {
    condition ="SELECT title as names, genre_id as IDs, parent as Parent_IDs FROM genres" 
    con.query(condition , function (err , genres, fields) {
      if (err) throw err;
      res.send(genres.rows);
  }); 
});


//get specific artist information 
app.post('/api/artists',(req, res)=> {
    const id = req.body.ID;
    condition ="SELECT artist_id, artist_comments, artist_favorites, artist_handle, artist_name,artist_url, tags FROM raw_artists WHERE artist_id = '"+ id + "' " ;
    con.query(condition , function (err , artists, fields) {
        if (err) throw err;
        if (artists){
            res.send(artists.rows);
        }
        else {
            res.status(404).send(`GET requests for ${id} cannot be found`)
        }; 
    });
});

//get following details for a given track id
app.post('/tracks',(req, res)=> {
    const id = req.body.ID; 
    condition ="SELECT album_id, album_title, artist_id, artist_name, tags, track_date_created, track_date_recorded, track_duration, track_genres, track_number, track_title  FROM raw_tracks WHERE track_id= " + id + " " ;
      con.query(condition , function (err , track, fields) {
     console.log(track)
       if (track.rows){
            //delete track.rows.track_id
            res.send(track.rows);
        }
        else {
            res.status(404).send(`GET requests for ${id} cannot be found`)
        };
    }); 
});


//get track id based on pattern with album and track title
app.post('/tracks_pattern',(req, res)=> {
    const title = req.body.title; 
    const pattern = "%"+ title + "%";
    const n = req.body.n; 

    condition ="SELECT track_id FROM raw_tracks WHERE track_title LIKE '"+ pattern + "' OR album_title LIKE '" + pattern + "'LIMIT '" + n+ "'";
        con.query(condition , function (err , tracks, fields) {
        if (err) throw err;
         if (tracks){
            res.send(tracks.rows);
        }
        else {
            res.status(404).send(`GET requests for ${id} cannot be found`)
        };
    });
});

//get artist ids based on pattern with name 
app.post('/artist_pattern',(req, res)=> {
        const name = req.body.pattern;
        const pattern = "%"+name+"%";
        condition ="SELECT artist_id, artist_name FROM raw_artists WHERE artist_name LIKE '"+ pattern + "' ";
        con.query(condition , function (err , artists, fields) {
        if (err) throw err;
         if (artists.rows){
            res.send(artists.rows);
        }
        else {
            res.status(404).send(`GET requests for ${id} cannot be found`)
        };
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
