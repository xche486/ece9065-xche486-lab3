//for post fetch
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

//1
function allgenres(){
    fetch('http://localhost:3000/api/genres')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      update_table(data);
    })
    .catch(rejected => {
    console.log(rejected);
  });
}

//要检查这个在error的时候不会被运行！！！！！！！！！！！！！！！！！！！！！！
function update_table(ls){
  let tbo=document.getElementById("results").children[0];
  tbo.parentNode.removeChild(tbo);
  tbo = document.createElement("tbody");
  document.getElementById("results").appendChild(tbo);

  header = document.createElement("tr");
  tbo.appendChild(header);

  //for headers
  let lskeys=Object.keys(ls[0]);
  for (const i in lskeys){
    let key= document.createElement("th");
    let key_text = document.createTextNode(lskeys[i]);
    key.appendChild(key_text);
    header.appendChild(key);
  }

  //for contents
  for (j in ls){
    let row = document.createElement("tr");
    let lsvalues=Object.values(ls[j]);
    for (const i in lsvalues){
      let value= document.createElement("td");
      let content=document.createTextNode(lsvalues[i]);
      value.appendChild(content);      
      row.appendChild(value);
    }
    tbo.appendChild(row);
  }
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
      if (res.length==0){ 
        alert("no such id");
      }
      else{
        update_table(res);
      }
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
      if (res.length==0){ 
        alert("no such id");
      }
      else{
        update_table(res);
      }
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
  if (isNaN(n)){
    window.alert("bad input for n, recheck");
    return;
  }
  else{
    let item = {"title": title,"n":n };
    let receive = postData('POST', 'http://localhost:3000/tracks_pattern/', item);
    receive.then(res =>{
      console.log(res);
      if (res.length==0){ 
        alert("no such id");
      }
      else{
        update_table(res);
      }
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
      if (res.length==0){ 
        alert("no such id");
      }
      else{
        update_table(res);
      }
    })
  }
}

//6 不知道需不需要list of tracks
function newlist(){
  const name =document.getElementById("given_lsname_new").value;
  const tracks =document.getElementById("given_ls_track_new").value;
    //这里需要一个input check，防止他输入的不是1,2,3这种格式/
  if (name =="" || tracks=="" ){
      window.alert("no input")
  }
  else{
    let trackls = "["+tracks+"]";
    let item = {"name": name,"tracks": trackls};
    let receive = postData('POST', 'http://localhost:3000/newlist', item);
    receive.then(res =>{
      console.log(res);
      if (res.length==0){ 
        alert("no such name");
        return;
      }
      if (Object.keys(res).includes("success")){
        alert ("You successively created a list");
        return;
      }
      if (Object.keys(res).includes("error")){
        alert("you cannot use this name, occupied");
        return;
      }
      else{
        update_table(res);
      }
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
      if (res.length==0){ 
        alert("no such name");
        return;
      }
      if (Object.keys(res).includes("success")){
        alert ("You successively created a list");
        return;
      }
      if (Object.keys(res).includes("error")){
        alert("you cannot use this name, not used");
        return;
      }
      else{
        update_table(res);
      }
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
      if (res.length==0){ 
        alert("no such name");
      }
      if (Object.keys(res).includes("success")){
        alert ("You successively deleted  a list");
        return;
      }
      if (Object.keys(res).includes("error")){
        alert("you cannot use this name, not used");
        return;
      }
      else{
        update_table(res);
      }
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
      if (res.length==0){ 
        alert("no such name");
        return;
      }
      if (Object.keys(res).includes("success")){
        alert ("You successively deleted  a list");
        return;
      }
      if (Object.keys(res).includes("error")){
        alert("you cannot use this name, not used");
        return;
      }
      else{
        update_table(res);
      }
    })
  }
}

//10
function lists(){
  fetch('http://localhost:3000/api/deletelist')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      update_table(data);
    })
    .catch(rejected => {
    console.log(rejected);
  });
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
      update_front_table(data);
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
      update_front_table(data);
    })
  }
}

//frontend 2.2
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
      update_front_table(data);
    })
  }
}

//for backend
function update_front_table(ls){
  let tbo=document.getElementById("front_table").children[0];
  let header=document.getElementById("front_table").children[0].children[0];
  header.parentNode.removeChild(header);
  header = document.createElement("tr");
  tbo.appendChild(header);

  //for headers
  let lskeys=Object.keys(ls[0]);
  for (const i in lskeys){
    let key= document.createElement("th");
    let key_text = document.createTextNode(lskeys[i]);
    key.appendChild(key_text);
    header.appendChild(key);
  }

  //for contents
  for (j in ls){
    let row = document.createElement("tr");
    let lsvalues=Object.values(ls[j]);
    for (const i in lsvalues){
      let value= document.createElement("td");
      let content=document.createTextNode(lsvalues[i]);
      value.appendChild(content);      
      row.appendChild(value);
    }
    tbo.appendChild(row);
  }
}