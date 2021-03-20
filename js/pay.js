(function () {
  chrome.storage.sync.get({ password: '111111' }, function (res) {
    document.getElementById('payPassword_rsainput').value = res.password;
    document.getElementById('J_authSubmit').click();
    document.title = 'fail';
  });
  const timer = setInterval(function () {
    const blacklist = ['间隔'];
    const re = new RegExp(blacklist.join('|'), 'i');
    if (re.test(document.body.textContent)) {
      clearInterval(timer);
      window.location.reload();
    }
  }, 1000);
})();
