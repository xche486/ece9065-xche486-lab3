function allgenres(){
    fetch('http://localhost:3000/api/genres')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data2=data;
        document.getElementById("1").innerHTML = data2[0].names;
        document.getElementById("2").innerHTML = data2[0].IDs;
        document.getElementById("3").innerHTML = data2[0].parents;
        document.getElementById("4").innerHTML = data2[1].names;
      // do something with data
    })
    .catch(rejected => {
    console.log(rejected);
});
       

genre = document.createElement('div');
genre.setAttribute("class", "genre");
genrename = document.createElement('p');
genreid = document.createElement('p');
genreparent = document.createElement('p');
genre.appendChild(genrename);
genre.appendChild(genreid);
genre.appendChild(genreparent);

// may need to createTextNode as well

//create artist 
artistIDfind(){

}
