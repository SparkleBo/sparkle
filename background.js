chrome.contextMenus.create({
    id: "analyzeText",
    title: "Analyze Text",
    contexts: ["selection"],
});


// 在 background.js
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "analyzeText") {
        let text = info.selectionText;
        // 调用 OpenAI API 分析文本
        fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
            },
            body: JSON.stringify({
                'prompt': text,
                'max_tokens': 60
            })
        })
        .then(response => response.json())
        .then(data => {
            // 显示结果
            chrome.tabs.sendMessage(tab.id, {text: 'Result: ' + data.choices[0].text});
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
