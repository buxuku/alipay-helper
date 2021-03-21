const bg = chrome.extension.getBackgroundPage();
console.log(bg, 'bg');
const checkItem = document.getElementById('able');
let createStatus = false;
const createButton = document.getElementById('create');
function updateCreateButton() {
  createButton.innerHTML = `${createStatus ? '停止' : '开始'}创建订单`;
}
chrome.storage.sync.get(
  { able: false, password: '111111', time: 5000, create: false },
  function (item) {
    console.log(item, 'item');
    if (item.able) {
      checkItem.setAttribute('checked', item.able);
    }
    createStatus = item.create;
    updateCreateButton();
    document.getElementById('password').value = item.password;
    document.getElementById('time').value = item.time;
  }
);
document.addEventListener('DOMContentLoaded', function (event) {
  var _selector = document.querySelector('input[name=able]');
  _selector.addEventListener('change', function (event) {
    console.log('ok', _selector.checked);
    chrome.storage.sync.set({ able: _selector.checked });
  });
});
document.getElementById('doPay').addEventListener('click', function () {
  const value = document.getElementById('payNumber').value;
  const time = document.getElementById('time').value;
  createAction();
  bg.doPay(+value, +time);
});

document.getElementById('clear').addEventListener('click', function () {
  bg.clear();
  document.getElementById('number').innerHTML = 0;
});

document.getElementById('password').addEventListener('input', function () {
  chrome.storage.sync.set({
    password: document.getElementById('password').value,
  });
});
document.getElementById('time').addEventListener('input', function () {
  chrome.storage.sync.set({ time: document.getElementById('time').value });
});
document.getElementById('number').innerHTML = bg.payLinks.length;
document.getElementById('payNumber').value = bg.payLinks.length;

function createAction() {
  createStatus = !createStatus;
  chrome.storage.sync.set({ create: createStatus });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'create',
      payload: createStatus,
    });
  });
  updateCreateButton();
}

createButton.addEventListener('click', createAction);

function updateNumber(){
    document.getElementById('number').innerHTML = bg.payLinks.length;
}
// chrome.extension.onMessage.addListener(function (request) {
//   if (request.action === 'add') {
//   }
// });
