let radius = 150
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.radius) {
    radius = Number(request.radius)
    if (!request.startMeasure) {
      changeRadius()
    }
  }
  if (request.startMeasure) {
    changeRadius()
  }
})

const calcStateRotation = (rotation) => {
  rotation = rotation % 360

  if (rotation < 0) {
    rotation += 360
  }

  return Number(rotation).toFixed(2)
}

const calOppositeAngle = (curDeg) => {
  let a = Number(curDeg) + 180
  if (a > 360) {
    a = a - 360
  }
  return Number(a).toFixed(2)
}

const clear = () => {
  document.onmousemove = null
  document.onmouseup = null
}

function  create() {
  const measureAngle = document.createElement('div');
  const style = document.createElement('style');

  let oLi="";
  let sCss="";

  for (let i=0; i<360; i++) {

    sCss += ".measure-angle li:nth-of-type(" + (i) + "){-webkit-transform: rotate(" + i * 1 + "deg);}";

    if ((i + 1) % 10 === 0) {
      oLi += "<li><em>" + (i + 1 === 360 ? 0 : i + 1) + "</em></li>";
    } else {
      oLi += "<li></li>";
    }
  };

  measureAngle.innerHTML= '<div class="line_wrap"><div class="container">' +"<ul>" + oLi + '</ul><div class="line_0"></div><div class="line_180"></div><div class="line_90">90</div><div class="line_270">270</div></div></div>';

  style.innerHTML+=sCss;
  measureAngle.className = 'measure-angle'

  document.head.appendChild(style);
  document.body.appendChild(measureAngle);

}

function changeRadius () {
  const exist = document.getElementById('changeRadius')
  if (exist) {
    exist.remove()
  }
  const style = document.createElement('style');
  style.id = 'changeRadius'
  const sCss = `.measure-angle {display: block; width: ${radius * 2 - 80}px; height: ${radius * 2 - 80}px;}.measure-angle li { transform-origin: center ${radius}px; left: ${radius - 1}px } .line_0,.line_90,.line_180,.line_270 {
  transform-origin: center ${radius}px; left: ${radius - 1}px}`
  style.innerHTML+=sCss;
  document.head.appendChild(style);
}

function bindOplineEvent () {

  let _dragEle = document.querySelector('.measure-angle')
  let _line90 = document.querySelector('.line_90')
  let _line270 = document.querySelector('.line_270')

  if (_line90) {
    _line90.addEventListener('mousedown', function (e) {
      if (!_dragEle) {
        return
      }
      let _act = true
      e.stopPropagation()
      // 按下位置

      const bound = _dragEle.getBoundingClientRect()
      const center = {x: bound.left + bound.width / 2, y: bound.top + bound.height / 2 }
      document.onmousemove = (e) => {
        if (!_act) {
          return
        }
        const downX = e.clientX
        const downY = e.clientY
        const radian = Math.atan2(downY - center.y, downX - center.x)
        const deg = radian * 180 / Math.PI + 90
        const curDeg = calcStateRotation(deg)
        // console.log('度数', curDeg)
        _line90.style.transform = `rotate(${ curDeg }deg)`;
        _line90.style.height = `60px`;
        _line90.innerHTML = curDeg


        const oppositeAngle = calOppositeAngle(curDeg)
        _line270.style.transform = `rotate(${ oppositeAngle }deg)`;
        _line270.style.height = `60px`;
        _line270.innerHTML = oppositeAngle
      }
      document.onmouseup = (e) => {
        _line270.style.removeProperty('height')
        _line90.style.removeProperty('height')
        _act = false
        clear()
      }


    })
  }

  if (_line270) {
    _line270.addEventListener('mousedown', function (e) {
      if (!_dragEle) {
        return
      }
      let _act = true
      e.stopPropagation()
      // 按下位置

      const bound = _dragEle.getBoundingClientRect()
      const center = {x: bound.left + bound.width / 2, y: bound.top + bound.height / 2 }
      console.log('center', center)


      document.onmousemove = (e) => {
        if (!_act) {
          return
        }
        const downX = e.clientX
        const downY = e.clientY
        const radian = Math.atan2(downY - center.y, downX - center.x)
        const deg = radian * 180 / Math.PI + 90
        const curDeg = calcStateRotation(deg)
        // console.log('度数', curDeg.toFixed(2))
        _line270.style.transform = `rotate(${ curDeg }deg)`;
        _line270.innerHTML = curDeg
        _line270.style.height = `60px`;

        const oppositeAngle = calOppositeAngle(curDeg)
        _line90.style.transform = `rotate(${ oppositeAngle }deg)`;
        _line90.innerHTML = oppositeAngle
        _line90.style.height = `60px`;
      }
      document.onmouseup = (e) => {
        _line270.style.removeProperty('height')
        _line90.style.removeProperty('height')
        _act = false
        clear()
      }
    })
  }

}

function bindMeasureAngleEvent () {
  let _dragEle = document.querySelector('.measure-angle')
  let _act = false

  const dragEnter = (e) => {
    if (e.type !== 'mousedown') {
      return
    }
    const bcr = _dragEle.getBoundingClientRect()
    _act = true
    // 按下位置
    const downX = e.clientX
    const downY = e.clientY

    document.onmousemove = (e) => {
      if (!_act) {
        return
      }

      // 移动当前元素
      if (_dragEle) {
        const left = e.clientX - downX + bcr.x
        const top = e.clientY - downY + bcr.y
        const bound = _dragEle.getBoundingClientRect()
        const { width, height } = bound
        _dragEle.style.left = Math.min(Math.max(left, -(width / 2)), window.innerWidth - width + 10) + 'px'
        _dragEle.style.top = Math.min(Math.max(top, 0), window.innerHeight - height / 5) + 'px'
        _dragEle.style.transform = 'none'
      }
    }

    document.onmouseup = (e) => {
      _act = false
      clear()
    }

  }


  if (_dragEle) {
  _dragEle.addEventListener('mousedown', dragEnter)
  }

}

create()
bindOplineEvent()
bindMeasureAngleEvent()

