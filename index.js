const express = require("express");
const app = express();
const port = 3000;

const sth = [
    {track_id:2, album_id:1, album_title:"AWOL - A Way Of Life",	artist_id: "1" , artist_name:"AWsdfsOL"},
    {track_id:3, album_id:1, album_title:"AWOL - A Way Of Life",	artist_id: "1" , artist_name:"AWssOL"},
    {track_id:5, album_id:1, album_title:"AWOL - A Way Of Life",	artist_id: "1" , artist_name:"AWwwOL"}
  ];

app.get('/api/raw_track', (req,res) =>{
    console.log(`GET requests for ${req.url}`)
    res.send(sth);
});

app.listen(port, () => {
    console.log(`listening to port ${port}`)
});
