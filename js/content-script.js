const helloWorld = document.createElement('div');
const style = document.createElement('style');

let oLi="";

let sCss="";

for (var i=0;i<360;i++) {

  sCss+=".helloworld li:nth-of-type("+(i+1)+"){-webkit-transform: rotate("+i*1+"deg);}";

  if ((i + 1) % 10 === 0) {
    oLi+="<li><em>"+(i+1)+"</em></li>";
  } else {
    oLi+="<li></li>";
  }


};

helloWorld.innerHTML= "<ul>" + oLi + '</ul>';

style.innerHTML+=sCss;
helloWorld.className = 'helloworld'


document.head.appendChild(style);
document.body.appendChild(helloWorld);
