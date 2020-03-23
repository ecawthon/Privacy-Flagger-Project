$(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    var url = activeTab.url;
    var color = 'gray';
    var file = "/img/gray.png";
    if (url.includes('facebook')) {
      color = 'red'
      file = "/img/red.png";
    } else if (url.includes('google')) {
      color = 'yellow'
      file = "/img/yellow.png";
    } else {
      color = 'green';
      file = "/img/green.png";
    }
    $('#rank').attr("src", file);
  });
});