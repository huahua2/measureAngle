var helloWorld = document.createElement('div');
var style = document.createElement('style');

var oLi="";

var sCss="";

for (var i=0;i<360;i++) { //一个表盘总共是60个刻度

  sCss+=".helloworld li:nth-of-type("+(i+1)+"){-webkit-transform: rotate("+i*1+"deg);}";

  oLi+="<li></li>";

};

helloWorld.innerHTML=oLi;

style.innerHTML+=sCss;//表盘刻度渲染完成
// helloWorld.innerHTML = 'hello world!';
helloWorld.className = 'helloworld'

helloWorld.style.textAlign = 'center';
helloWorld.style.fontSize = '48px';


document.head.appendChild(style);
document.body.appendChild(helloWorld);
