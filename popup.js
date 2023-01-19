
const btn = document.querySelector('.btn_measure')
btn.addEventListener('click', function () {
  const input = document.querySelector("#inputAngle")
  let message = {
    startMeasure: true,
    radius: value.textContent,
    opacity: opacityValue.textContent
  }
  if (input.value.trim() !== '') {
    message.angle = Number(input.value)
  }
  sendMsg(message)
  window.close()
})

const value = document.querySelector("#value")
const input = document.querySelector("#pi_input")
value.textContent = input.value


const opacityValue = document.querySelector("#opacityValue")
const opacityInput = document.querySelector("#opacity")
opacityValue.textContent = opacityInput.value


chrome.storage.local.get(['object', 'string'], function(obj){
  if (obj.object.measureRadius !== undefined) {
    value.textContent = obj.object.measureRadius
    input.value = obj.object.measureRadius
  }

  if (obj.object.opacity !== undefined) {
    opacityInput.value = obj.object.opacity
    opacityValue.textContent = obj.object.opacity
  }
});

input.addEventListener("input", (event) => {
  value.textContent = event.target.value
  sendMsg({
    radius: value.textContent
  })
  chrome.storage.local.set({
    object: {measureRadius: value.textContent },
  }, function(){
    console.log('measureRadius保存成功');
  })

})

opacityInput.addEventListener("input", (event) => {
  opacityValue.textContent = event.target.value
  sendMsg({
    opacity: opacityValue.textContent
  })
  chrome.storage.local.set({
    object: {opacity: opacityValue.textContent },
  }, function(){
    console.log('opacity保存成功');
  })

})

function sendMsg (msg) {
  console.log('sendMsg')
  // popup ---> content
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {

    chrome.tabs.sendMessage(tabs[0].id, msg, res => {
      console.log('popup=>content')
      console.log(res)
    })
  })
}
