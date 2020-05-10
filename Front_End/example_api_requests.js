//GET specific policy
const http = new XMLHttpRequest();
const policy_url =  "facebook.com";
const request_url = "http://localhost:5000/policy?url=" + policy_url;
http.open("GET", request_url, true);

http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(http.responseText)
    }
}

http.send();

//GET all policies
const http = new XMLHttpRequest();
http.open("GET", "http://localhost:5000/policy", true);
http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(http.responseText)
    }
}

http.send();

//POST a new policy
const http = new XMLHttpRequest();
http.open("POST", "http://localhost:5000/policy", true);
http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
        console.log(http.responseText)
    }
}

var body = JSON.stringify({"url": "miele.com", "rating": "high", "subgroup_id": 2, "last_fetch_date": "2020-04-23"});
http.send(body);

//POST multiple policies
const http = new XMLHttpRequest();
http.open("POST", "http://localhost:5000/policy", true);
http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
        console.log(http.responseText)
    }
}

var body = JSON.stringify({"policies": [
	{"url": "hotels.com", "rating": "high", "subgroup_id": 6, "last_fetch_date": "2020-04-23"},
	{"url": "booking.com", "rating": "low", "subgroup_id": 7, "last_fetch_date": "2020-04-23"},
	{"url": "instagram.com", "rating": "low", "subgroup_id": 1, "last_fetch_date": "2020-04-23"},
	{"url": "duckduckgo.com", "rating": "medium", "subgroup_id": 10, "last_fetch_date": "2020-04-23"}
]});
http.send(body);

//PUT
const http = new XMLHttpRequest();
http.open("PUT", "http://localhost:5000/policy", true);
http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 204) {
        console.log(http.responseText)
    }
}

//you can remove rating, subgroup_id or last_fetch_date if you don't want to modify those
var body = JSON.stringify({"url": "facebook.com", "rating": "medium", "subgroup_id": 10, "last_fetch_date": "2020-04-29"});

http.send(body);

//DELETE one policy
const http = new XMLHttpRequest();
http.open("DELETE", "http://localhost:5000/policy", true);
http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 204) {
        console.log(http.responseText)
    }
}

var body = JSON.stringify({"url": "facebook.com"});
http.send(body);

//DELETE multiple policies
const http = new XMLHttpRequest();
http.open("DELETE", "http://localhost:5000/policy", true);
http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 204) {
        console.log(http.responseText)
    }
}

var body = JSON.stringify({"policies": [
  {"url": "twitter.com"},
  {"url": "google.com"},
  {"url": "linkedin.com"}
]});
http.send(body);
