chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        var url = activeTab.url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0];
        const http = new XMLHttpRequest();
        const request_url = "http://localhost:5000/policy?url=" + url;
        var rating = "";
        http.open("GET", request_url, true);

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                rating = http.responseText.split(',')[1].split(':')[1];
                rating = rating.substring(2, rating.length - 1);
                if (rating === "worse") {
                    chrome.browserAction.setIcon({
                        path: {
                            "32": "/img/red.png",
                            "16": "/img/red.png"
                        }
                    });
                } else if (rating === "moderate") {
                    chrome.browserAction.setIcon({
                        path: {
                            "32": "/img/yellow.png",
                            "16": "/img/yellow.png"
                        }
                    });
                } else if (rating === "better") {
                    chrome.browserAction.setIcon({
                        path: {
                            "32": "/img/green.png",
                            "16": "/img/green.png"
                        }
                    });
                } 
            } else {
                chrome.browserAction.setIcon({
                    path: {
                        "32": "/img/blue.png",
                        "16": "/img/blue.png"
                    }
                });
            }
        }
        http.send();
    });
});
