from flask import Flask, request
import json
import MySQLdb

app = Flask(__name__)
cursor = None

def get_db_connection():
    global cursor

    if not cursor:
        db = MySQLdb.connect("policy-mysql", "root", "my-secret-pw", "policy-db")
        db.autocommit(True) #this should be disabled in a live application
        cursor = db.cursor()

    return cursor

def execute_query(sql_query, param_list=None):
    cursor = get_db_connection()
    cursor.execute(sql_query, param_list)
    return cursor.fetchall()

def does_task_exist(url):
    sql = f"SELECT url, rating, subgroup_id, last_fetch_date FROM policies WHERE url = (%s);"
    request_response = execute_query(sql, (url,))

    if len(request_response) == 0:
        return False

    return True

def no_policy_message():
    return json.dumps({"error": "There is no privacy policy currently stored for that URL."}), 404

@app.route('/policy', methods = ['GET'])
def get_policies():
    data = request.get_json()

    if not data:
        sql = "SELECT url, rating, subgroup_id, last_fetch_date FROM policies;"
        query_response = execute_query(sql)

        policy_list = list()

        for row in query_response:
            policy_list.append({
                "url": row[0],
                "rating": row[1],
                "subgroup_id": row[2],
                "last_fetch_date": str(row[3])
                })

        return json.dumps({"policies": policy_list}), 200
    else:
        return get_policy(data.get("url"))

def get_policy(url):
    sql = f"SELECT url, rating, subgroup_id, last_fetch_date FROM policies WHERE url = (%s);"
    query_response = execute_query(sql, (url,))
    print(url)

    if len(query_response) == 0:
        return no_policy_message()

    response_msg = {
        "url": query_response[0][0],
        "rating": query_response[0][1],
        "subgroup_id": query_response[0][2],
        "last_fetch_date": str(query_response[0][3])
        }

    return json.dumps(response_msg), 200

@app.route('/policy', methods = ['POST'])
def create_policy_object():
    data = request.get_json()

    if "policies" in data:
        return create_policy_objects(data)
    else:
        url = data.get("url")
        rating = data.get("rating")
        subgroup_id = data.get("subgroup_id")
        last_fetch_date = data.get("last_fetch_date")

        sql = f"INSERT INTO policies (url, rating, subgroup_id, last_fetch_date) VALUES (%s, %s, %s, %s);"
        execute_query(sql, (url, rating, subgroup_id, last_fetch_date))

        print(data)

        return json.dumps({"url": url}), 201

def create_policy_objects(data):
    policies_list = list()

    for policy in data.get("policies"):
        url = policy.get("url")
        rating = policy.get("rating")
        subgroup_id = policy.get("subgroup_id")
        last_fetch_date = policy.get("last_fetch_date")

        sql = f"INSERT INTO policies (url, rating, subgroup_id, last_fetch_date) VALUES (%s, %s, %s, %s);"
        execute_query(sql, (url, rating, subgroup_id, last_fetch_date))

        policies_list.append({"url": url})

    return json.dumps({"policies": policies_list}), 201

@app.route('/policy', methods = ['PUT'])
def update_policy_object():
    data = request.get_json()
    url = data.get("url")

    if not does_task_exist(url):
        return no_policy_message()

    query_snippet = ""
    if "rating" in data:
        rating = data.get("rating")
        query_snippet = f"rating = '{rating}'"
    if "rating" in data and "subgroup_id" in data:
        query_snippet += ", "
    if "subgroup_id" in data:
        subgroup_id = data.get("subgroup_id")
        query_snippet += f"subgroup_id = {subgroup_id}"
    if ("subgroup_id" in data and "last_fetch_date" in data) or ("rating" in data and "last_fetch_date" in data):
        query_snippet += ", "
    if "last_fetch_date" in data:
        last_fetch_date = data.get("last_fetch_date")
        query_snippet += f"last_fetch_date = '{last_fetch_date}'"

    sql = f"UPDATE policies SET {query_snippet} WHERE url = (%s);"
    execute_query(sql, (url,))

    return '', 204

@app.route('/policy', methods = ['DELETE'])
def delete_policy_object():
    data = request.get_json()

    if "policies" in data:
        return delete_policy_objects(data)
    else:
        url = data.get("url")

        sql = f"DELETE FROM policies WHERE url = (%s);"
        execute_query(sql, (url,))

        return '', 204

def delete_policy_objects(data):
    data = request.get_json()
    tasks_to_delete = [item.get("url") for item in data.get("policies")]

    for url in tasks_to_delete:
        sql = f"DELETE FROM policies WHERE url = (%s);"
        execute_query(sql, (url,))

    return '', 204

#This function should be removed in a live application
@app.route('/reset', methods = ['PUT'])
def reset_table():
    execute_query("DELETE FROM policies;")
    execute_query("ALTER TABLE policies AUTO_INCREMENT = 1;")

    return '', 204
