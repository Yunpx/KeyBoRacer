document.addEventListener("DOMContentLoaded", function(){

  var requestURL =  "Text/textfile1.json";
  var request = new XMLHttpRequest();
  var wordsArray =[];
  var space=false;
  var currentId=0;
  var currentValue="";
  var correctCount=0;
  var wrongCount=0;
  var accuracy=0+"%";
  var timerToggle =  false;

  var currentWordCount=0;

  var totalWords=0;
  var wpm=0;
  var percent= 0;

  //------------------< getting JSON file >------------------------

  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    var text = request.response;
    populateHeader(text);
    addCurrent(0);
    totalWords = getTotalWords(wordsArray);
  }

  function populateHeader(jsonObj) {
    var myH1 = document.createElement('p');
    myH1.textContent = jsonObj['mainText'];

    var str = myH1.textContent;
    wordsArray = str.split(" ");
    createE(wordsArray);
  }

  function getTotalWords(array) {
    return array.length;
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

  //------------------< adding classes >------------------------

  function addCurrent(id){
    var element =document.getElementById(id);
    element.classList.add("current");
  }
  function removePrevious(id) {
    var element =document.getElementById(id);
    element.classList.remove("current");
  }


  //------------------< checking typo >------------------------

  function checker() {
    currentValue= document.getElementById('typing').value.replace(/ /g,'');
    //get current id
    var element =document.getElementById(currentId);

    if(currentValue == wordsArray[currentId]){
      element.classList.add("correct");
      correctCount +=1;

    }else {
      element.classList.add("wrong");
      wrongCount +=1;
      move2();
      console.log("wrong "+wrongCount);
    }
  }

  function clearInputField() {
    document.getElementById('typing').value = '';
  }

  //------------------< input field >------------------------
  document.getElementById("typing").addEventListener("keypress",(event) => {
  const keyName = event.key;
  getInput(event);
  });

  function getInput(event) {
      var char = event.which || event.keyCode;
      if(char == 32|| char == 13){
        //check right or wrong
        checker();

        currentWordCount+=1;

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
        accuracy = Math.round(correctCount/currentWordCount *100) +"%";
        clearInputField();
      }
      wpm = Math.round((keysPressed/5)/seconds *60);

      percent =Math.round((currentWordCount/totalWords)*100);
      move(percent);

      document.getElementById("accuracy").innerHTML = accuracy;

  }
  //------------------< progress >------------------------
  function move(amount) {
    var elem = document.getElementById("myBar");
    var width = 0;
    frame();
    function frame() {
        width=amount;
        if(width == 98){
          width= 100;
        }
        elem.style.width = width + '%';
        moveRight(width);

    }
  }
  var wrongCount2=0;

  //------------------< Health >------------------------
  function move2() {
    wrongCount2 = wrongCount*10;
    var elem = document.getElementById("myBar2");
    var width = 100;
    frame();
    function frame() {
        width=width-wrongCount2;
        console.log("width2 is " + width);

          if(width < 0){
            alert("game Over! You have ran out of fuel!!!");
            clearInterval(myVar);
            clearInterval(myVar2);
            stop();
            document.getElementById("typing").blur();
          }
          elem.style.width = width + '%';
          moveRight(width);

    }
  }


  //-----------------< keysPressed >-------------------------
  var keysPressed = 0;
  document.addEventListener('keypress', (event) => {
    var char = event.which || event.keyCode;
   if(char!=32 && char!=13 && char!=9 && char!=8){
     keysPressed++;
    }
  });



  //------------------< Timer >------------------------
  var myVar;
  var myVar2;
  var ready= 3;

  function setFocusToTextBox(){
      document.getElementById("typing").focus();
    }

    document.getElementById("startButton").addEventListener("click", function(){
      setTimeout(setTimer, 4000);
      setFocusToTextBox();
    });
    //// TODO: no 3-2-1 counter not working
    document.getElementById("startButton").addEventListener("click",function() {
      setInterval(function() {
        if(ready>0){
       document.getElementById("prepare").innerHTML = ready;
       ready-=1;
     }else {
       clearInterval(ready);
       document.getElementById("prepare").innerHTML = "";
     }
      } , 1000)
    });


  function setTimer() {
    myVar = setInterval(myTimer, 1000);
    myVar2 = setInterval(myTimer2, 0.0001);
  }

  var seconds = 0;
  var minutes = 0;
  var miliseconds=0;


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


      if(seconds%60==0){
        minutes+=1;
        var m = d.setMinutes(minutes);
        m= d.getMinutes();
        document.getElementById("minutes").innerHTML = m;
      }
      wpm = Math.round((keysPressed/5)/seconds *60);

      document.getElementById("wpm").innerHTML = wpm;

    }

    //------------------< moving Car >------------------------

var animate, left=0, imgObj=null;

function init(){

   imgObj = document.getElementById('myImage');
   imgObj.style.position= 'absolute';
   imgObj.style.top = '10px';
   imgObj.style.left = '0px';
   imgObj.style.visibility='hidden';

   moveRight();
}

function moveRight(){
    var progressBar = document.getElementById("myBar");
    left = parseInt(imgObj.style.left, 10);
    if (left<=900) {//// TODO: get dynamic width
        imgObj.style.left = progressBar.clientWidth + 'px';
        imgObj.style.visibility='visible';
    } else {
        stop();
    }
}

function stop(){
   clearTimeout(animate);
}

window.onload = function() {init();};

  });
