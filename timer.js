var myVar = setInterval(myTimer, 1000);
var seconds = 55;
var minutes = 0;
var miliseconds=0;
var myVar = setInterval(myTimer2, 0.0000000001);

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
    var ms = d.set

    seconds+=1;
    var t = d.setSeconds(seconds);
    t=d.getSeconds()
    document.getElementById("second").innerHTML = t;
    console.log(t);

    if(seconds%60==0){
      minutes+=1;
      var m = d.setMinutes(minutes);
      m= d.getMinutes();
      document.getElementById("minutes").innerHTML = m;

    }
  }
