function allgenres(){
    fetch('http://localhost:3000/api/genres')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        /*
        let i = 0;
        result = document.getElementById("all_genres")
        while (i < data.length){
          genre = document.createElement('div');
          genre.setAttribute("class", "genre");
          genre

          genrename = document.createElement('p');
          gname=document.createTextNode(data2[i].names);
          genrename.appendChild(gname);
          genre.appendChild(genrename);


          genreid = document.createElement('p');
          gid=document.createTextNode(data2[i].IDs)
          genreid.appendChild(gid);
          genre.appendChild(genreid);

          genreparent = document.createElement('p');
          gparent=document.createTextNode(data2[i].parents)
          genreparent.appendChild(gparent);
          genre.appendChild(genreparent);
        }
        document.getElementById("1").innerHTML = data2[0].names;
        document.getElementById("2").innerHTML = data2[0].IDs;
        document.getElementById("3").innerHTML = data2[0].parents;
        document.getElementById("4").innerHTML = data2[1].names;

      // do something with data
      */
     
    })
    .catch(rejected => {
    console.log(rejected);
  });

}
       

