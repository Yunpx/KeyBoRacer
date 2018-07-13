document.addEventListener("DOMContentLoaded", function(){

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
  var gameEnded= false;
  var wrongCount2=0;


  var whiteBoard =  "Text/textfile1.json";
  var request = new XMLHttpRequest();


  //------------------< getting JSON file for whiteBoard >------------------------

  request.open('GET', whiteBoard);
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
      if (!gameEnded) {
        move2();
      }
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
        percent =Math.round((currentWordCount/totalWords)*100);
        if (gameEnded==true) {
          move(0);
        }else {
          move(percent);
          if(currentId ==wordsArray.length-2){
            clearInputField();
            clearInterval(myVar);
            clearInterval(myVar2);
            gameEnded= true;
             $('#modalComplete').modal('show');
             showNextButton();
             showInstruction();

          }else {
            currentId+=1;
            addCurrent(currentId);
            removePrevious(currentId-1);
            accuracy = Math.round(correctCount/currentWordCount *100) +"%";

            clearInputField();
            console.log("accuracy "+ accuracy);
            document.getElementById("accuracy").innerHTML = accuracy;
            wpm = Math.round((keysPressed/5)/seconds *60);
            console.log(wpm);
          }
          person.wpm = wpm;
          person.accuracy=accuracy;
        }
      }
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

  //------------------< Fuel >------------------------
  function move2() {
    wrongCount2 = wrongCount*10;
    var elem = document.getElementById("myBar2");
    var width = 100;
    frame();
    function frame() {
        width=width-wrongCount2;
        console.log("width2 is " + width);

          if(width < 0){
            $('#fuelout').modal('show');
            clearInterval(myVar);
            clearInterval(myVar2);
            stop();
            document.getElementById("typing").blur();
            showNextButton();
            showInstruction();

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
      $('#typing').focus();
    }

    document.getElementById("typing").addEventListener("keypress",function() {
      setTimer()
    },{once:true});


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
      $('#milisecond').html(t);
      }

  function myTimer() {
      var d = new Date();
    	d.setHours(0,0,0,0);

      seconds+=1;
      var t = d.setSeconds(seconds);
      t=d.getSeconds();
      $('#second').html(t);


      if(seconds%60==0){
        minutes+=1;
        var m = d.setMinutes(minutes);
        m= d.getMinutes();
        $('#minutes').html(m);
      }
      wpm = Math.round((keysPressed/5)/seconds *60);
      $('#wpm').html(wpm);
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
   document.getElementById("nextButton").style.display = "none";

}

function moveRight(){
    var progressBar = document.getElementById("myBar");
    left = parseInt(imgObj.style.left, 10);
    if (left<=1100) {
        imgObj.style.left = progressBar.clientWidth + 'px';
        imgObj.style.visibility='visible';
    }
}
function showNextButton() {
    var x = document.getElementById("nextButton");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function showInstruction() {
    var x = document.getElementById("Instructions");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


function Player () {
    this.name = getName();
    this.accuracy=getAccuracy();
    this.wpm=getWpm();
  }

function getName() {
    return this.name;
}
function getAccuracy() {
    return this.accuracy;
}
function getWpm() {
    return this.wpm;
}

function changeCar() {
    var x = document.getElementById("mySelect").value;
    // document.getElementById("demo").innerHTML = "You selected: " + x;
    switch (x) {
      case "BMW":
        document.getElementById("p1").style.font = "  30px Blackadder ITC";
        document.getElementById("typing").style.font = "  30px Blackadder ITC";
        document.getElementById('myImage').src="IMAGES/car2.png";

        break;
      case "Mercedes":
        document.getElementById("p1").style.font = "  20px Comic Sans MS";
        document.getElementById("typing").style.font = "  20px Comic Sans MS";
        document.getElementById('myImage').src="IMAGES/car4.png";

        break;
      case "Volvo":
        document.getElementById("p1").style.font = "  25px Berlin Sans FB";
        document.getElementById("typing").style.font = "  25px Berlin Sans FB";
        document.getElementById('myImage').src="IMAGES/car5.png";

        break;
      case "Audi":
        document.getElementById("p1").style.font = "  25px Helvetica";
        document.getElementById("typing").style.font = " 25px Helvetica";
        document.getElementById('myImage').src="IMAGES/car3.png";
        console.log(x);
        break;
      default:

    }

}

document.getElementById("mySelect").addEventListener("change", changeCar);


window.onload = function() {init();};

//------------------< MeterBar >------------------------


  });
