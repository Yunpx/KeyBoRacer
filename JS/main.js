

var requestURL =  "Text/textfile1.json";
var request = new XMLHttpRequest();
var wordsArray =[];
var space=false;
var currentId=0;
var currentValue="";

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var text = request.response;
  populateHeader(text);
  addCurrent(0);
}

function populateHeader(jsonObj) {
  var myH1 = document.createElement('p');
  myH1.textContent = jsonObj['mainText'];

  var str = myH1.textContent;
  wordsArray = str.split(" ");
  // document.getElementById("p1").innerHTML = "Hello my old friend!";
  createE(wordsArray);
  console.log(wordsArray);
}

function createE(paragraph) {
  for (var i = 0; i < paragraph.length; i++) {
    var para = document.createElement("span");
    para.setAttribute("id", i);
    var t = document.createTextNode(paragraph[i]);
    var space = document.createTextNode(" ");
    para.appendChild(t);
    para.appendChild(space);
    document.getElementById("p1").appendChild(para);
  }
}

function addCurrent(id){
  var element =document.getElementById(id);
  element.classList.add("current");
}
function removePrevious(id) {
  var element =document.getElementById(id);
  element.classList.remove("current");
}

// function getKey(e)
// {
//     window.alert("The key code is: " + e.keyCode);
// }
//
// document.onkeyup = getKey;
//32


function uniCharCode(event) {
    var char = event.which || event.keyCode;
    if(char == 32|| char == 13){
      //removes gaps in the input
      currentValue= document.getElementById('typing').value.replace(/ /g,'');
      //get current id
      var element =document.getElementById(currentId);

      if(currentValue == wordsArray[currentId]){
        console.log("yes");
        element.classList.add("correct");

      }else {
        console.log("no");
        element.classList.add("wrong");
      }
      currentId+=1;
      addCurrent(currentId);
      removePrevious(currentId-1);
      document.getElementById('typing').value = '';

    }
    // console.log(char);
}
