const { application } = require("express");
const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req,res) =>{
    res.send('hello you');
});

app.listen(port, () => {
    console.log(`listening to port ${port}`)
});
