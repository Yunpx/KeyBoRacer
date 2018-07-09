

var requestURL =  "Text/textfile1.json";
var request = new XMLHttpRequest();
var wordsArray =[];
var space=false;
var currentId=0;
var currentValue="";
var correctCount=0;
var wrongCount=0;
var accuracy=0+"%";

var totalChar=0;

var wpm=0;

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
function checker() {
  currentValue= document.getElementById('typing').value.replace(/ /g,'');
  //get current id
  var element =document.getElementById(currentId);

  if(currentValue == wordsArray[currentId]){
    console.log("yes");
    element.classList.add("correct");
    correctCount +=1;

  }else {
    console.log("no");
    element.classList.add("wrong");
    wrongCount +=1;
  }
}

function clearInputField() {
  document.getElementById('typing').value = '';
}

function uniCharCode(event) {
    var char = event.which || event.keyCode;
    if(char == 32|| char == 13){
      //check right or wrong
      checker();
      // console.log("current " + currentId + " Array "+ wordsArray.length);

      totalChar+=1;

      // console.log(totalChar);
      if(currentId ==wordsArray.length-2){
        clearInputField();
        alert("Race completed!");
        clearInterval(myVar);
        clearInterval(myVar2);


      }else {
        currentId+=1;
        addCurrent(currentId);
        removePrevious(currentId-1);
      }
      accuracy = Math.round(correctCount/totalChar *100) +"%";
      wpm = Math.round((keysPressed/5)/seconds *60);
      clearInputField();
    }
    document.getElementById("accuracy").innerHTML = accuracy;
    document.getElementById("wpm").innerHTML = wpm;
    console.log("Time passed "+ seconds + " keysPressed "+ keysPressed+ " wpm "+wpm);

    // console.log(char);
}

//------------------------------------------
var keysPressed = 0;
document.addEventListener('keypress', (event) => {
  var char = event.which || event.keyCode;
 if(char!=32 && char!=13 && char!=9 && char!=8){
   keysPressed++;
   console.log(keysPressed);
  }
});

//------------------------------------------

var myVar = setInterval(myTimer, 1000);
var seconds = 0;
var minutes = 0;
var miliseconds=0;
var myVar2 = setInterval(myTimer2, 0.0001);

// startTimer(){
//   var myVar = setInterval(myTimer, 1000);
//   var myVar2 = setInterval(myTimer2, 0.0001);
//
// }

function myTimer2() {
    var d = new Date();
  	d.setHours(0,0,0,0,0);
    miliseconds+=1;
    var t = d.setMilliseconds(miliseconds);
    t=d.getMilliseconds();
    document.getElementById("milisecond").innerHTML = t;
    }

function myTimer() {
    var d = new Date();
  	d.setHours(0,0,0,0);

    seconds+=1;
    var t = d.setSeconds(seconds);
    t=d.getSeconds()
    document.getElementById("second").innerHTML = t;
    // console.log(t);
    // console.log("Seconds passed "+ seconds);

    if(seconds%60==0){
      minutes+=1;
      var m = d.setMinutes(minutes);
      m= d.getMinutes();
      document.getElementById("minutes").innerHTML = m;

    }
  }
