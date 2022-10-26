const { Router } = require("express");
const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();

const sth = [
    {track_id:2, album_id:1, album_title:"AWOL - A Way Of Life",	artist_id: "1" , artist_name:"AWsdfsOL"},
    {track_id:3, album_id:1, album_title:"AWOL - A Way Of Life",	artist_id: "1" , artist_name:"AWssOL"},
    {track_id:5, album_id:1, album_title:"AWOL - A Way Of Life",	artist_id: "1" , artist_name:"AWwwOL"}
];

//static front end
app.use('/', express.static('static'))

//middleware
app.use((req,res,next)=>{ // for all routes
    console.log(`${req.method} requests for ${req.url}`);
    next();//working for next route (log)
});

//router 
app.use('/api/raw_track', router);//install router at this location


//normal get
router.get('/', (req,res) =>{
    res.send(sth);
});

//get specific part
router.get('/:track_id',(req, res)=> {
    const id =req.params.track_id;
    //validate
    const track = sth.find( p => p.track_id === parseInt(id));
    if (track){
        res.send(track);
    }
    else {
        res.status(404).send(`GET requests for ${id} cannot be found`)
    }
})


app.listen(port, () => {
    console.log(`listening to port ${port}`)
});
