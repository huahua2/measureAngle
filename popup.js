
const btn = document.querySelector('.btn_measure')
btn.addEventListener('click', function () {
  let message = {
    startMeasure: true,
    radius: value.textContent
  }
  sendMsg(message)
})

const value = document.querySelector("#value")
const input = document.querySelector("#pi_input")
value.textContent = input.value

chrome.storage.local.get(['object', 'string'], function(obj){
  value.textContent = obj.object.measureRadius
  input.value = obj.object.measureRadius
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
