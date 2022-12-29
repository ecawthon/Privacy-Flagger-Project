$(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        var url = activeTab.url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0];
        const http = new XMLHttpRequest();
        const request_url = "http://localhost:5000/policy?url=" + url;
        var rating = "";
        http.open("GET", request_url, true);
        var worse;
        var moderate = "Unknown";
        var better;
        var icon = "/img/blue.png";
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                rating = http.responseText.split(',')[1].split(':')[1];
                rating = rating.substring(2, rating.length - 1);
                if (rating === "worse") {
                    worse = "Worse";
                    moderate = "Moderate";
                    better = "Better";
                    icon = "/img/red.png";
                    $('#dot').css({
                        "position": "absolute",
                        "width": "7px",
                        "height": "7px",
                        "left": "75px",
                        "top": "124px",
                        "background": "#EB5757",
                        "border-radius": "50%"
                    });
                    var obj = $('#text').text("Worse because it:\n - Don't keep your information private\n - Track your actions\n - Give you targeted ads");
                    obj.html(obj.html().replace(/\n/g, '<br/>'));
                } else if (rating === "moderate") {
                    worse = "Worse";
                    moderate = "Moderate";
                    better = "Better";
                    icon = "/img/yellow.png";
                    $('#dot').css({
                        "position": "absolute",
                        "width": "7px",
                        "height": "7px",
                        "left": "168px",
                        "top": "124px",
                        "background": "#F2C94C",
                        "border-radius": "50%"
                    });
                    var obj = $('#text').text("Moderate because it:\n - Keeps your information private\n - Track your actions\n - Doesn't give you targeted ads");
                    obj.html(obj.html().replace(/\n/g, '<br/>'));
                } else if (rating === "better") {
                    worse = "Worse";
                    moderate = "Moderate";
                    better = "Better";
                    icon = "/img/green.png";
                    $('#dot').css({
                        "position": "absolute",
                        "width": "7px",
                        "height": "7px",
                        "left": "261px",
                        "top": "124px",
                        "background": "#219653",
                        "border-radius": "50%"
                    });
                    var obj = $('#text').text("Better because it:\n - Keeps your information private\n - Doesn't track your actions\n - Doesn't give you targeted ads");
                    obj.html(obj.html().replace(/\n/g, '<br/>'));
                }
                $('#line').css({
                    "visibility": "hidden"
                });
            } else {
                icon = "/img/blue.png";
                $('#dot').css({
                    "position": "absolute",
                    "width": "7px",
                    "height": "7px",
                    "left": "168px",
                    "top": "124px",
                    "background": "#2d9cdb",
                    "border-radius": "50%"
                });
                $('#line').css({
                    "position": "absolute",
                    "width": "279px",
                    "height": "1px",
                    "left": "32px",
                    "top": "127px",
                    "background": "#2d9cdb",
                    "border-radius": "10px"
                });
                // var obj = $('#text').text("\nCategorized as unknown because we don't have enough data to categorize it.");
                var obj = $('#text')
                    .text("Comments: " + rating);
                obj.html(obj.html().replace(/\n/g, '<br/>'));
            }
            $('#url').text(url);
            $('#icon').attr("src", icon);
            $('#worse').text(worse);
            $('#moderate').text(moderate);
            $('#better').text(better);
        }
        http.send();
    });
});
