const helloWorld = document.createElement('div');
const style = document.createElement('style');

let oLi="";

let sCss="";

for (var i=0;i<360;i++) {

  sCss+=".helloworld li:nth-of-type("+(i)+"){-webkit-transform: rotate("+i*1+"deg);}";

  if ((i + 1) % 10 === 0) {
    oLi+="<li><em>"+(i+1)+"</em></li>";
  } else {
    oLi+="<li></li>";
  }


};

helloWorld.innerHTML= "<ul>" + oLi + '</ul><div class="line_wrap"><div class="container"><div class="line_0"></div><div class="line_180"></div><div class="line_90"></div><div class="line_270"></div></div></div>';

style.innerHTML+=sCss;
helloWorld.className = 'helloworld'


document.head.appendChild(style);
document.body.appendChild(helloWorld);
