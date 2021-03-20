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
  chrome.runtime.sendMessage({
    action: 'add',
    payLinks,
  }, function(res){
    document.getElementById('J-set-query-form').value = '本页抓取完毕, 共有' + res +'条';
  });
})();
