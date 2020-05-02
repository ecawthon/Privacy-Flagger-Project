$(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        var url = activeTab.url;
        var file = "/img/gray.png";
        if (url.includes('discord')) {
            file = "/img/better.png";
        } else if (url.includes('reddit')) {
            file = "/img/unknown.png";
        } 
        $('#rank').attr("src", file);
    });
});