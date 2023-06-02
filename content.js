chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // 在页面上创建一个新的元素显示结果
    let div = document.createElement('div');
    div.textContent = request.text;
});
