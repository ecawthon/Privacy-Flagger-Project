chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        var url = activeTab.url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0];
        const request_url = "http://localhost:5000/policy?url=" + url;
        var rating = "";
        fetch(request_url).then(function(response) {

            if (this.readyState == 4 && this.status == 200) {
                rating = response.split(',')[1].split(':')[1];
                rating = rating.substring(2, rating.length - 1);
                if (rating === "worse") {
                    chrome.action.setIcon({
                        path: {
                            "32": "/img/red.png",
                            "16": "/img/red.png"
                        }
                    });
                } else if (rating === "moderate") {
                    chrome.action.setIcon({
                        path: {
                            "32": "/img/yellow.png",
                            "16": "/img/yellow.png"
                        }
                    });
                } else if (rating === "better") {
                    chrome.action.setIcon({
                        path: {
                            "32": "/img/green.png",
                            "16": "/img/green.png"
                        }
                    });
                }
            } else {
                chrome.action.setIcon({
                    path: {
                        "32": "/img/blue.png",
                        "16": "/img/blue.png"
                    }
                });
            }
        });
    });
});
