(function () {
  const payLinks = [];
  const list = document.querySelectorAll('option');
  list.forEach((item) => {
    const link = item.getAttribute('data-link');
    if (link && link.includes('buyerConfirmTrade')) {
      payLinks.push(link);
    }
  });
  console.log('payList', payLinks);
  chrome.runtime.sendMessage(
    {
      action: 'add',
      payLinks,
    },
    function (res) {
      document.getElementById('J-set-query-form').value =
        '本页抓取完毕, 共有' + res + '条';
    }
  );
  let timer = null;
  function autoClickSearch() {
    timer = setTimeout(function () {
      window.location.reload();
    }, 5000);
  }
  chrome.runtime.onMessage.addListener(function (request) {
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    if (request.action == 'create') {
      if (request.payload) {
        autoClickSearch();
      } else {
        clearTimeout(timer);
      }
    }
  });
  chrome.storage.sync.get({create: false}, function(item){
    if(item.create){
      autoClickSearch();
    }
  })
  // const autoFetch = window.localStorage.autoFetch === 'true' ? true : false;
  // if (autoFetch) {
  //   autoClickSearch();
  // }
  // const node = document.createElement('p');
  // node.id = 'handleFetch';
  // const nodeText = document.createTextNode(`${autoFetch ? '停止' : '开始'}自动抓取`);
  // node.appendChild(nodeText);
  // document.getElementById('J-submit-form').appendChild(node);
  // const selector = document.getElementById('handleFetch')
  // selector.addEventListener('click', function () {
  //   if (autoFetch) {
  //     clearTimeout(timer);
  //     window.localStorage.setItem('autoFetch', false);
  //     selector.innerHTML = '开始自动抓取';
  //   }else{
  //     autoClickSearch();
  //     window.localStorage.setItem('autoFetch', true);
  //     selector.innerHTML = '停止自动抓取';
  //   }
  // });
})();
