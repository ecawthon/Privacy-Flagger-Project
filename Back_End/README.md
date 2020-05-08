# Privacy Guardian Backend

This is the backend for the Privacy Guardian chrome extension. It uses a Flask app to offer an API and a MySQL database to store records. Both of these are run within Docker containers.

Please note that this is not ready to be run as a live application. There would need to be better authentication for the API and the database and some changes that have been commented in the api.py file, such as disabling autocommit for queries to the MySQL database (queries should be doublechecked to see if they've been successful and then committed one-by-one).

---

Before anything else, you have to download Docker Desktop. You should be able to do that [here](https://www.docker.com/products/docker-desktop).

Once that's downloaded, please run the following commands on the command line to set up the necessary Docker containers and make sure to modify the file paths to point to the COMPSCI-299-Privacy-Flagger-Project folder on your local system.

First, set up a Docker network. This allows Docker containers to communicate with each other.

`docker network create policy-network`

Then, modify the file paths in the following command and run it to set up the MySQL database container. A 'policies' table will automatically be created using the create_table.sql file in the docker-entrypoint-initdb.d folder, if you want to modify the table before the database is initialised, then edit the create_table.sql file before you run the following command.

```
docker run --name policy-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=policy-db -v MODYIFY/PATH/TO/SUIT/LOCAL/SYSTEM/COMPSCI-299-Privacy-Flagger-Project/Back_End/db/db_records:/var/lib/mysql -v MODYIFY/PATH/TO/SUIT/LOCAL/SYSTEM/COMPSCI-299-Privacy-Flagger-Project/Back_End/db/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d --network policy-network  -dit mysql:latest --default-authentication-plugin=mysql_native_password
```

Last, modify the file paths in the following commands and set up the Flask app container:

```
docker build -t policy_backend_image MODYIFY/PATH/TO/SUIT/LOCAL/SYSTEM/COMPSCI-299-Privacy-Flagger-Project/Back_End
```

```
docker run  -dit --name=policy-backend -e FLASK_APP=api.py -p 5000:5000 -v MODYIFY/PATH/TO/SUIT/LOCAL/SYSTEM/COMPSCI-299-Privacy-Flagger-Project/Back_End:/app --network policy-network policy_backend_image
```

If you need to make code changes to the api.py file, then restart the Docker container using: `docker restart policy-backend` and code changes will be incorporated.

All of your containers should now be set up and you should be able to send requests to the API endpoints listed in the next section. If not, please go to the Docker troubleshooting tips section below the API endpoints section.

---

## API endpoints:

---

### GET http://localhost:5000/policy


### To get all stored policies

#### Input:

Nothing.

#### Output:

###### Body

```
{"policies": [
  {"url": "facebook.com", "rating": "low", "subgroup_id": 9, "last_fetch_date": "2020-04-18"},
  {"url": "twitter.com", "rating": "medium", "subgroup_id": 7, "last_fetch_date": "2020-04-07"},
  {"url": "google.com", "rating": "high", "subgroup_id": 2, "last_fetch_date": "2020-04-12"},
  {"url": "linkedin.com", "rating": "low", "subgroup_id": 11, "last_fetch_date": "2020-04-01"}
]}
```

###### HTTP status: `200 OK`

### To get specific policy

#### Input:

###### Body

```
{"url": "facebook.com"}
```

#### Output:

###### Body

```
{"url": "facebook.com", "rating": "low", "subgroup_id": 9, "last_fetch_date": "2020-04-18"}
```

###### HTTP status: `200 OK`

---

### POST http://localhost:5000/policy

### To add one policy to database

#### Input:

###### Body

```
{"url": "miele.com", "rating": "high", "subgroup_id": 2, "last_fetch_date": "2020-04-23"}
```

#### Output:

###### Body

```
{"url": "miele.com"}
```

###### HTTP status: `201 Created`

### To add multiple policies to database

#### Input:

###### Body

```
{"policies": [
	{"url": "hotels.com", "rating": "high", "subgroup_id": 6, "last_fetch_date": "2020-04-23"},
	{"url": "booking.com", "rating": "low", "subgroup_id": 7, "last_fetch_date": "2020-04-23"},
	{"url": "instagram.com", "rating": "low", "subgroup_id": 1, "last_fetch_date": "2020-04-23"},
	{"url": "duckduckgo.com", "rating": "medium", "subgroup_id": 10, "last_fetch_date": "2020-04-23"}
]}
```

#### Output:

###### Body

```
{"policies": [
  {"url": "hotels.com"},
  {"url": "booking.com"},
  {"url": "instagram.com"},
  {"url": "duckduckgo.com"}
]}
```

###### HTTP status: `201 Created`

---

### PUT http://localhost:5000/policy

### To alter a policy in database

#### Input:

###### Body

```
{"url": "facebook.com", "rating": "medium", "subgroup_id": 10, "last_fetch_date": "2020-04-29"}
```

(You can include one, two, or all three of 'rating', 'subgroup_id', or 'last_fetch_date' and only those will be altered.)

#### Output:

###### Body

Nothing.

###### HTTP status: `204 No content`

---

### DELETE http://localhost:5000/policy

### To delete one policy from database

#### Input:

###### Body

```
{"url": "facebook.com"}
```

#### Output:

###### Body

Nothing.

###### HTTP status: `204 No content`

### To delete multiple policies from database

#### Input:

###### Body

```
{"policies": [
  {"url": "twitter.com"},
  {"url": "google.com"},
  {"url": "linkedin.com"}
]}
```

#### Output:

###### Body

Nothing.

###### HTTP status: `204 No content`

---

## Docker troubleshooting tips


##### Docker logs

If something has gone wrong the first thing you should do is check the container logs. These will show you what is/was happening inside the container in a command line format.

For the MySQL container you run the command: `docker logs -f policy-mysql`

For the Flask container you run the command: `docker logs -f policy-backend`

##### Directly query MySQL

To directly query the MySQL database, use the following commands:

`docker exec -it policy-mysql bash` (to directly use the command line inside the container)

`mysql -uroot -p` (to log into MySQL)

Enter the password: `my-secret-pw`

`use policy-db;` (to use the database that contains the policies table)

And then you can use normal SQL queries on the policies table.

To see all column names: `SHOW COLUMNS FROM policies;`

To see all records: `SELECT * FROM policies;`

##### Start fresh

If nothing is working and you can't figure it out, maybe it's time to start from scratch.

First, stop all running containers. You can do this by running these commands: `docker kill policy-mysql` and `docker kill policy-backend`.

Next, you remove all Docker images, containers, networks etc. with the command: `docker system prune` and choosing `'y'` when prompted.

Then, you delete everything in the `/COMPSCI-299-Privacy-Flagger-Project/Back_End/db/db_records:/var/lib/mysql` folder.

And if you want to be very thorough, delete everything in your computer's recycling bin/trash can.

You can now start again from beginning with the instructions on how to build and run the containers.
