var payLinks = [];
chrome.extension.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request.action === 'close') {
    chrome.tabs.remove(sender.tab.id);
  }
  if (request.action === 'add') {
    request.payLinks.reverse().forEach((item) => {
      if (!payLinks.includes(item)) {
        payLinks.push(item);
      }
    });
    console.log('pay', payLinks);
    sendResponse(payLinks.length);
    updateStatus();
  }
  if (request.action === 'pay') {
    doPay(request.number);
  }
  if (request.action === 'clear') {
    clear();
  }
});

function updateStatus() {
  chrome.browserAction.setBadgeText({ text: payLinks.length.toString() });
  chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  var views = chrome.extension.getViews({ type: 'popup' });
  if (views.length > 0) {
    views[0].updateNumber();
  }
}

function clear() {
  payLinks = [];
  updateStatus();
}

function doPay(number, time) {
  let i = 0;
  var pay = function () {
    if (i < number && payLinks.length) {
      const link = payLinks.shift();
      chrome.tabs.create({ url: link, active: false });
      updateStatus();
      i++;
      return pay;
    } else {
      clearInterval(timer);
      return () => {};
    }
  };
  var timer = setInterval(pay(), time);
}
