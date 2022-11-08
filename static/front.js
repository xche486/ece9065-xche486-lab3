let addr="http://localhost:3000/";

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
         // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) 
    }),

      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
//referencing: https://developer.mozilla.org/en-US/docs/web/api/fetch_api/using_fetch

//1
function allgenres(){
  localaddr=addr+"genres";
  fetch(localaddr)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    update_table(data);
  })
  .catch(rejected => {
  console.log(rejected);
  });
}

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
  if (isNaN(id)){
    window.alert("bad input for id, recheck");
    return;
  }
  else{
    let item = {"ID": id };
    const localaddr=addr+"artists";
    let receive = postData('POST', localaddr, item);
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
  if (isNaN(id)){
    window.alert("bad input for id, recheck");
    return;
  }
  else{
    let item = {"ID": id };
    const localaddr=addr+"tracks";
    let receive = postData('POST',localaddr, item);
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
    const localaddr=addr+"tracks_pattern";
    let receive = postData('POST', localaddr, item);
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
    const localaddr=addr+"tracks_pattern";
    let receive = postData('POST', localaddr, item);
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

//6 
function newlist(){
  const name =document.getElementById("given_lsname_new").value;
  const tracks =document.getElementById("given_ls_track_new").value;
      if (name =="" ){
      window.alert("no input")
  }
  else{
    let trackls;
    if (name.match(/<\/?[\w\s]*>|<.+[\W]>/)){
      alert("invalid input for name, you are suspicious")
    }
    if (tracks=="" ){
      trackls = "[]";
    }
    else if ((!tracks.match(/^[0-9][0-9,]*[0-9]$/)) && (tracks !="")){
      alert("invalid array of tracks");
      return;
    }
    else{
      trackls = "["+tracks+"]"
    };
    let item = {"name": name,"tracks": trackls};
    const localaddr=addr+"newlist";
    let receive = postData('POST', localaddr, item);
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
//referencing:https://javascript.plainenglish.io/the-7-most-commonly-used-regular-expressions-in-javascript-bb4e98288ca6 

//7
function savetrackls(){
  const name =document.getElementById("given_lsname_update").value;
  const tracks =document.getElementById("given_ls_track").value;
  if (name =="" ){
    window.alert("no input");
  }
  else{
    if (!tracks.match(/^[0-9][0-9,]*[0-9]$/)){
      alert("invalid array of tracks");
      return;
    }
    var trackls = "["+tracks+"]";
    let item = {"name": name,"tracks": trackls};
    const localaddr=addr+"updatelist";
    let receive = postData('POST', localaddr, item);
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
    const localaddr=addr+"schedule";
    let receive = postData('POST', localaddr, item);
    receive.then(res =>{ 
      console.log(res);
      if (res.length==0){ 
        alert("no such name");
      }
      if (Object.keys(res).includes("success")){
        alert ("You successively deleted a list");
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
    const localaddr=addr+"deletelist";
    let receive = postData('POST', localaddr, item);
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
  const localaddr=addr+"lists";
  fetch(localaddr)
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
    const localaddr=addr+"searchmusic";
    let receive = postData('POST',localaddr, item);
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
        update_front_table(res);
      }
 
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
    if (name2.match(/<\/?[\w\s]*>|<.+[\W]>/)){
      alert("invalid input for name, you are suspicious")
    }

    let item = {"name": name2,"tracks": "[]"};
    const localaddr=addr+"newlist";
    let receive = postData('POST',localaddr, item);
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
        alert("you cannot use this name,  used");
        return;
      }
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
    const localaddr=addr+"favlist";
    let receive = postData('POST', localaddr, item);
    receive.then(res =>{
      console.log(res);                                                               ``
      if (res.length==0){ 
        alert("no such name or might be empty");
        return;
      }
      if (Object.keys(res).includes("success")){
        alert ("You successively created a list");
        return;
      }
      if (Object.keys(res).includes("error")){
        alert("you cannot use this name,  used");
        return;
      }
      else{
        update_front_table(res);
      }
    })
  }
}

// table for backend
function update_front_table(ls){
  
  let tbo=document.getElementById("front_table").children[0];
  tbo.parentNode.removeChild(tbo);
  tbo = document.createElement("tbody");
  document.getElementById("front_table").appendChild(tbo);
  header = document.createElement("tr");
  tbo.appendChild(header);

  let lskeys=Object.keys(ls[0]);
  for (const i in lskeys){
    let key= document.createElement("th");
    let key_text = document.createTextNode(lskeys[i]);
    key.appendChild(key_text);
    header.appendChild(key);
  }

  //for contents
  for (j in ls){
    if (ls[j]!= null){
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
}

function orderby(option){
  let table = document.getElementById("front_table");
  let swaping = 1;
  while (swaping){
    swaping = 0;
    let lorow = table.rows;
    let i =1;
    let needswap;
    while (i < lorow.length-1){
      swaping = 0;
      needswap=0;
      let x= lorow[i].getElementsByTagName("td")[option];
      let y= lorow[i+1].getElementsByTagName("td")[option];
      if (x.innerHTML> y.innerHTML) {
        needswap= 1;
        break;
      }
      i+=1;
    }
    if (needswap){
        lorow[i].parentNode.insertBefore(lorow[i + 1], lorow[i]);
        swaping = 1;
    }
  }
  console.log("sort completed");
}
//referencing: https://www.w3schools.com/howto/howto_js_sort_table.asp
