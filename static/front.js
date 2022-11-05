//1
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



//记得要改啊！！！！！！！！！！！！！！！！
async function postData(method = '', url = '', data) {
  // Default options are marked with *

  const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', 
      credentials: 'same-origin', // include, *same-origin, omit
      ...(!data ? {} : {
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) 
      }),

      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

//2
function artistIDfind(){
  const id =document.getElementById("given_artist_id").value;
  if (id ==""){
    window.alert("no input")
  }
  else{
    let item = {"ID": id };
    let receive = postData('POST', 'http://localhost:3000/api/artists', item);
    receive.then(res =>{
      console.log(res);
    })
  }
}

//3
function trackIDfind(){
  const id =document.getElementById("given_track_id").value;
  if (id ==""){
    window.alert("no input")
  }
  else{
    let item = {"ID": id };
    let receive = postData('POST', 'http://localhost:3000/tracks', item);
    receive.then(res =>{
      console.log(res);
    })
  }
}

//4
function trackPatternfind(){
  const title =document.getElementById("given_track_pattern").value;
  const n =document.getElementById("given_value_n").value;
  if (title =="" || n == ""){
    window.alert("no input")
  }
  else{
    let item = {"title": title,"n":n };
    let receive = postData('POST', 'http://localhost:3000/tracks_pattern/', item);
    receive.then(res =>{
      console.log(res);
    })
  }
}

//5
function artistPatternfind(){
  const pattern =document.getElementById("given_artist_pattern").value;
  if (pattern =="" ){
    window.alert("no input")
  }
  else{
    let item = {"pattern": pattern};
    let receive = postData('POST', 'http://localhost:3000/artist_pattern/', item);
    receive.then(res =>{
      console.log(res);
    })
  }
}

//6 不知道需不需要list of tracks
function newlist(){
  const name =document.getElementById("given_lsname_new").value;
  const tracks =document.getElementById("given_ls_track_new").value;
  if (name =="" || tracks=="" ){
      window.alert("no input")
  }
  else{
    let trackls = "["+tracks+"]";
    let item = {"name": name,"tracks": trackls};
    let receive = postData('POST', 'http://localhost:3000/newlist', item);
    receive.then(res =>{
      console.log(res);
    })
  }
}

//7
function savetrackls(){
  const name =document.getElementById("given_lsname_update").value;
  const tracks =document.getElementById("given_ls_track").value;
  //这里需要一个input check，防止他输入的不是1,2,3这种格式/
  if (name =="" ){
    window.alert("no input")
  }
  else{
    var trackls = "["+tracks+"]";
    let item = {"name": name,"tracks": trackls};
    let receive = postData('POST', 'http://localhost:3000/updatelist', item);
    receive.then(res =>{
      console.log(res);
    })
  }
}

//8
function gettrackls(){
  const name =document.getElementById("given_lsname_get").value;
  if (name =="" ){
    window.alert("no input")
  }
  else{
    let item = {"name": name};
    let receive = postData('POST', 'http://localhost:3000/schedule', item);
    receive.then(res =>{
      console.log(res);
    })
  }
}

//9
function deltrackls(){
  const name =document.getElementById("given_lsname_del").value;
  if (name =="" ){
    window.alert("no input")
  }
  else{
    let item = {"name": name};
    let receive = postData('POST', 'http://localhost:3000/deletelist', item);
    receive.then(res =>{
      console.log(res);
    })
  }
}

//10
function lists(){
    let receive = postData('GET', 'http://localhost:3000/deletelist', item);
    receive.then(res =>{
      console.log(res);
    })
}

//frontend 1
function track_search(){
  const name =document.getElementById("given_music_name").value;
  const option = document.getElementById("name").options.selectedIndex;
  if (name =="" ){
    window.alert("no input")
  }
  else{
    let item = {"name": name, "option":option};
    let receive = postData('POST', 'http://localhost:3000/searchmusic', item);
    receive.then(res =>{
      console.log(res);
    })
  }
}


//frontend 2
function newlist_name(){
  const name2= document.getElementById("given_lsname_fav").value;
  if (name2 ==""){
    window.alert("no input")
  }
  else{
    let item = {"name": name2,"tracks": "[]"};
    let receive = postData('POST', 'http://localhost:3000/newlist', item);
    receive.then(res =>{
      console.log(res);
    })
  }
}

function getfavlst(){
  const name =document.getElementById("given_lsname_fav").value;
  if (name =="" ){
    window.alert("no input")
  }
  else{
    let item = {"name": name};
    let receive = postData('POST', 'http://localhost:3000/favlist', item);
    receive.then(res =>{
      console.log(res);
    })
  }
}