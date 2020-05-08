//GET all policies
const Http = new XMLHttpRequest();
Http.open("GET", "http://localhost:5000/policy", true);
Http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

Http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(Http.responseText)
    }
}

Http.send();

//POST a new policy
const Http = new XMLHttpRequest();
Http.open("POST", "http://localhost:5000/policy", true);
Http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

Http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
        console.log(Http.responseText)
    }
}

Http.send(JSON.stringify({"url": "miele.com", "rating": "high", "subgroup_id": 2, "last_fetch_date": "2020-04-23"}));
