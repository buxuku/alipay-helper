(function () {
  chrome.storage.sync.get({ able: false }, function (item) {
    if (item.able) {
      const timer = setInterval(function () {
        const blacklist = ['已收到您的付款'];
        const re = new RegExp(blacklist.join('|'), 'i');
        if (re.test(document.body.textContent)) {
          chrome.extension.sendMessage({ action: 'close' });
          clearInterval(timer);
        }
      }, 1);
    }
  });
})();
