const express = require("express");
const app = express();
const port = 3000;

const sth = [
    {track_id:2, album_id:1, album_title:"AWOL - A Way Of Life",	artist_id: "1" , artist_name:"AWsdfsOL"},
    {track_id:3, album_id:1, album_title:"AWOL - A Way Of Life",	artist_id: "1" , artist_name:"AWssOL"},
    {track_id:5, album_id:1, album_title:"AWOL - A Way Of Life",	artist_id: "1" , artist_name:"AWwwOL"}
];

//static front end
app.use('/', express.static('static'))

//normal get
app.get('/api/raw_track', (req,res) =>{
    console.log(`GET requests for ${req.url}`)
    res.send(sth);
});

//get specific part
app.get('/api/raw_track/:track_id',(req, res)=> {
    const id =req.params.track_id;
    console.log(`GET requests for ${req.url}`)
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
