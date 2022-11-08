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
app.use(async (req,res,next)=>{ // for all routes
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
  //referencing: https://node-postgres.com/features/connecting

//check db connection 
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


//1.get all available genre names, IDs and parent IDs
app.get('/genres', async(req, res)=> {
    condition ="SELECT title as names, genre_id as IDs, parent as Parent_IDs FROM genres" 
    await con.query(condition , function (err , genres, fields) {
      if (err) throw err;
      res.send(genres.rows);
      console.log()
  }); 
});


//2.get specific artist information 
app.post('/artists',async(req, res)=> {
    console.log(req.body);
    const id = req.body.ID;
    condition ="SELECT artist_id, artist_comments, artist_favorites, artist_handle, artist_name,artist_url, tags FROM raw_artists WHERE artist_id = '"+ id + "' " ;
    await con.query(condition , function (err , artists, fields) {
        if (err) throw err;
        if (artists){
            res.send(artists.rows);
            console.log("empty is returned");
        }
        else {
            const badrequest = {"error": "bad request, there is no such list!"};
            res.send(badrequest);
            console.log("error to return");
        }; 
    });
});

//3.get following details for a given track id
app.post('/tracks', async (req, res)=> {
    const id = req.body.ID; 
    condition ="SELECT album_id, album_title, artist_id, artist_name, tags, track_date_created, track_date_recorded, track_duration, track_genres, track_number, track_title  FROM raw_tracks WHERE track_id= " + id + " " ;
    await con.query(condition , function (err , track, fields) {
    console.log(track)
       if (track.rows){
            //delete track.rows.track_id
            res.send(track.rows);
        }
        else {
            const badrequest = {"error": "bad request, there is no such list!"};
            res.send(badrequest);
        };
    }); 
});


//get track id based on pattern with album and track title
app.post('/tracks_pattern',async(req, res)=> {
    console.log(req.body);
    const title = req.body.title; 
    const pattern = "%"+ title + "%";
    const n = req.body.n; 

    condition ="SELECT track_id FROM raw_tracks WHERE track_title LIKE '"+ pattern + "' OR album_title LIKE '" + pattern + "'LIMIT '" + n+ "'";
    await con.query(condition , function (err , tracks, fields) {
        if (err) throw err;
         if (tracks){
            res.send(tracks.rows);
        }
        else {
            const badrequest = {"error": "bad request, there is no such list!"};
            res.send(badrequest);
        };
    });
});

//5.get artist ids based on pattern with name 
app.post('/artist_pattern', async (req, res)=> {
        console.log(req.body);
        const name = req.body.pattern;
        const pattern = "%"+name+"%";
        condition ="SELECT artist_id, artist_name FROM raw_artists WHERE artist_name iLIKE '"+ pattern + "' ";
        await con.query(condition , function (err , artists, fields) {
        if (err) throw err;
         if (artists.rows){
            res.send(artists.rows);
        }
        else {
            res.status(404).send(`GET requests for ${id} cannot be found`)
        };
      });
});

//6. create list name or error  
app.post('/newlist', async (req, res)=> {
    const name = req.body.name;
    const tracks = req.body.tracks;
    condition ="SELECT * FROM lists WHERE name = '"+ name + "' ";
    await con.query(condition , function (err , lists, fields) {
    if (err) throw err;
    if (lists.rows.length > 0){
        const badrequest = {"error": "bad request, You cannot use this name, occupied"};
        res.send(badrequest);
    }
    else {
        condition = "INSERT INTO lists VALUES ('"+ name +"','"+ tracks+ "') "
        console.log(condition);
        con.query(condition , function (err , lists, fields) {
            if (err) throw err;
            else {
                const success = {"success": "You have a new list now"};
                res.send(success);
            }
        });
        return;
    }
  });
});

//7. save list name or update
app.post('/updatelist', async (req, res)=> {
    const name = req.body.name;
    const tracks = req.body.tracks;
    condition ="SELECT * FROM lists WHERE name = '"+ name + "' ";
    console.log(condition);
    await con.query(condition, function (err, lists, fields) {
    if (err) throw err;
    if (lists.rows.length == 0){
        const badrequest = {"error": "bad request, there is no such list!"};
        res.send(badrequest);
    }
    else {
        condition = "UPDATE lists SET tracks = '" + tracks +"' WHERE name = '"+ name + "' "; 
        con.query(condition , function (err , lists, fields) {
            if (err) throw err;
            else {
                const success = {"success": "You have updated the list "};
                res.send(success);
            }
        });
    };
  });
});

//8. get a list of tracks based on schedules
app.post('/schedule', async (req, res)=> {
    const name = req.body.name;
    condition ="SELECT tracks FROM lists WHERE name = '"+ name + "' ";
    await con.query(condition, function (err, lists, fields) {
    if (err) throw err;
    if (lists.rows.length == 0){
        const badrequest = {"error": "bad request, there is no such list!"};
        res.send(badrequest);
    }
    else {
        res.send(lists.rows);
        console.log(lists.rows);
        }
  });
});

//9. delete a list of tracks based on schedules
app.post('/deletelist', async(req, res)=> {
    const name = req.body.name;
    condition ="SELECT tracks FROM lists WHERE name = '"+ name + "' ";
    await con.query(condition,  async function (err, lists, fields) {
    if (err) throw err;
    if (lists.rows.length == 0){
        const badrequest = {"error": "bad request, there is no such list!"};
        res.send(badrequest);
    }
    else {
        condition = "DELETE FROM lists WHERE name = '"+ name + "' "; 
        await con.query(condition , async function (err , lists, fields) {
            if (err) throw err;
            else {
                const success = {"success": "You have deleted the list "};
                res.send(success);
            }
        });
    }
  });
});

//10. get a list of list of tracks, num of tracks, total durations.
app.get('/lists', async(req, res)=> {
    condition ="SELECT * FROM lists";
    con.query(condition, async function (err, lists, fields) {
        if (err) throw err;
        lists = lists.rows;
        console.log("lists is ", lists);

        if (lists.length == 0){
            const badrequest = {"error": "bad request, there is no list!"};
            res.send(badrequest);
        }
        else {
            var index = 0;
            let returns=[];
            while ( index < lists.length) {
                console.log("list is ", lists[index].tracks);
                lotracks = lists[index].tracks;
                let ttime= await totaltime(lotracks);
                ttime = ttime +"s";
                console.log("main received duration is ", ttime);
                console.log("return is :", lists[index].name, lotracks.length, ttime);
                returns.push({"name":lists[index].name, "length":lotracks.length,"duration": ttime});
                console.log("returns is ", returns);
                index+=1;
            }
            res.send(returns);
        }
    });

});

async function totaltime(tracks){
    var totalmin = 0;
    var totalsec = 0;
    for (const track of tracks){
        //console.log("this track is:", track);
        let timing = await duration(track);
        if (timing.length > 0){
           // console.log("timig is ",timing[0].track_duration);
            let [mins,secs] = (timing[0].track_duration).split(":");
           // console.log("min",mins,"secs",secs);
            totalmin += parseInt(mins);
            totalsec += parseInt(secs);    
        }
    }
    ttime = (totalmin * 60 + totalsec).toString();
    //console.log("totalmin",totalmin,"totalsec",totalsec, "duration is ",ttime);
    return ttime;
/*         
        console.log("total is :", duration);
        return duration.toString();
 */    
    
}

async function duration (track){
    let results= new Promise((resolve, reject) => {
        condition ="SELECT track_duration FROM raw_tracks WHERE track_id = '" + track + "'";
        con.query(condition, (err, time) => {
            if (err) throw err;
            else {
               // console.log(time.rows);
                resolve(time.rows);
            }
        })
    });
    return results;
}

//front 01 
app.post('/searchmusic',async(req, res)=> {
    var name = req.body.name;
    const option = req.body.option;
    let condition;
    name = "%"+name+"%";
    if (option == "0"){
        //trackname
        condition ="SELECT artist_name, track_title, album_title, track_duration FROM raw_tracks WHERE track_title iLike '"+ name + "' ";
    }
    if (option == "1"){
        //artist name 
        condition ="SELECT artist_name, track_title, album_title, track_duration FROM raw_tracks WHERE artist_name iLike '"+ name + "' ";
    }
    if (option == "2"){
        //album name 
        condition ="SELECT artist_name, track_title, album_title, track_duration FROM raw_tracks WHERE album_title iLike '"+ name + "' ";
    }
    con.query(condition, function (err, musics, fields) {
    if (err) throw err;
    if (musics.rows.length == 0){
        const badrequest = {"error": "there is no music with this name exist"};
        res.send(badrequest);   
    }
    else {
        res.send(musics.rows);
    }
  });
});


//frontend 2. create any number of fav list
app.post('/favlist', async(req, res)=> {
    const name = req.body.name;
    condition ="SELECT tracks FROM lists WHERE name = '"+ name + "' ";
    await con.query(condition, async function (err, tracks, fields) {
        if (err) throw err;
        if (tracks.rows.length == 0){
            const badrequest = {"error": "bad request, there is no such list!"};
            res.send(badrequest);
        }
        else {
            let results=[];
            tracks=tracks.rows[0].tracks;
            for (const id in tracks){
                console.log("giving is ", tracks[id]);
                let result= await waiting(tracks[id]);
                if (result[0]==undefined){
                    console.log("undefined here");
                }
                else{
                    results.push(result[0]);
                    console.log("getting is ",result)    
                }
            }
            console.log("ALL result are ",results);
            res.send(results);
        }
  });
});

async function waiting (track){
//        condition2 ="SELECT artist_name, track_title, album_title, track_duration FROM raw_tracks WHERE track_id = '"+ track + "' ";
    let results= new Promise((resolve, reject) => {
        let condition ="SELECT artist_name, track_title, album_title, track_duration FROM raw_tracks WHERE track_id = '"+ track + "' ";
        con.query(condition, (err, music) => {
            if (err) throw err;
            else {
                console.log(music.rows);
                resolve(music.rows);
            }
        })
    })
    console.log(results);
    return results;
} 

app.listen(port, () => {
    console.log(`listening to port ${port}`)
});
