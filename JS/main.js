

var requestURL =  "Text/textfile1.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var text = request.response;
  populateHeader(text);
}
function populateHeader(jsonObj) {
  var myH1 = document.createElement('p');
  myH1.textContent = jsonObj['mainText'];

  var str = myH1.textContent;
  var res = str.split(" ");
  // document.getElementById("p1").innerHTML = "Hello my old friend!";
  createE(res);
  console.log(res);
}

function createE(paragraph) {
  for (var i = 0; i < paragraph.length; i++) {
    var para = document.createElement("span");
    var t = document.createTextNode(paragraph[i]);
    var space = document.createTextNode(" ");
    para.appendChild(t);
    para.appendChild(space);
    document.getElementById("p1").appendChild(para);
  }
}
