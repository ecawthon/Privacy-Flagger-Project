CREATE TABLE policies (
    url VARCHAR(100) NOT NULL PRIMARY KEY,
    rating VARCHAR(10) NOT NULL,
    subgroup_id INT NOT NULL,
    last_fetch_date DATE NOT NULL
);

INSERT INTO policies (url, rating, subgroup_id, last_fetch_date)
VALUES ('facebook.com', 'worse', 9, '2020-04-18');

INSERT INTO policies (url, rating, subgroup_id, last_fetch_date)
VALUES ('twitter.com', 'moderate', 7, '2020-04-07');

INSERT INTO policies (url, rating, subgroup_id, last_fetch_date)
VALUES ('google.com', 'better', 2, '2020-04-12');

INSERT INTO policies (url, rating, subgroup_id, last_fetch_date)
VALUES ('linkedin.com', 'worse', 11, '2020-04-01');
