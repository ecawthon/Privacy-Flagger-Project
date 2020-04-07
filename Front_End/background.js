chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        var url = activeTab.url;
        if (msg.action === "updateIcon" && url.includes('discord')) {
            chrome.browserAction.setIcon({
                path: {"128": "/img/icon128.png"}
            });
        }
        if (msg.action === "updateIcon" && url.includes('reddit')) {
            chrome.browserAction.setIcon({
                path: "/img/tiger.png" 
            });
        }
    });
});