chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        /* 
        What needs to be changes here is: 
        - Use the URL/domain as the key for the API get 
          function to get the grade from the database. 
        - Then use the grading getted from the database in 
          the if-statement so that the right bulk of code 
          is triggered for the right grad. Right now it’s 
          hard coded and should be replaced with the grad.
        */
        const Http = new XMLHttpRequest();
        Http.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                console.log(Http.responseText)
            }
        }
        Http.open("GET", "http://localhost:5000/policy");
        Http.send();

        var activeTab = tabs[0];
        var url = activeTab.url;
        if (url.includes('facebook')) {
            chrome.browserAction.setIcon({
                path: {
                    "32": "/img/red.png",
                    "16": "/img/red.png"
                }
            });
        } else if (url.includes('google')) {
            chrome.browserAction.setIcon({
                path: {
                    "32": "/img/yellow.png",
                    "16": "/img/yellow.png"
                }
            });
        } else if (url.includes('figma')) {
            chrome.browserAction.setIcon({
                path: {
                    "32": "/img/green.png",
                    "16": "/img/green.png"
                }
            });
        } else {
            chrome.browserAction.setIcon({
                path: {
                    "32": "/img/blue.png",
                    "16": "/img/blue.png"
                }
            });
        }
    });
});