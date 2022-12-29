from flask import Flask, request
import json
import MySQLdb
#import urllib

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
    sql = f"SELECT `Site URL`, Comments, `Policy URL`, `Policy collection date` FROM sites WHERE `Site URL` = (%s);"
    request_response = execute_query(sql, (url,))

    if len(request_response) == 0:
        return False

    return True

def no_policy_message():
    return json.dumps({"error": "There is no privacy policy currently stored for that URL."}), 404

@app.route('/policy', methods = ['GET'])
def get_policies():
    data = request.args.get("url")

    if not data:
        sql = f"SELECT `Site URL`, Comments, `Policy URL`, `Policy collection date` FROM sites;"
        query_response = execute_query(sql)

        policy_list = list()

        for row in query_response:
            policy_list.append({
                "`Site URL`": row[0],
                "Comments": row[1],
                "Policy URL": row[2],
                "Policy collection date": str(row[3])
                })

        return json.dumps({"policies": policy_list}), 200
    else:
        return get_policy(data)

def get_policy(url):
    sql = f"SELECT `Site URL`, Comments, `Policy URL`, `Policy collection date` FROM sites WHERE `Site URL` = (%s);"
    query_response = execute_query(sql, (url,))

    if len(query_response) == 0:
        return no_policy_message()

    response_msg = {
        "`Site URL`": query_response[0][0],
        "Comments": query_response[0][1],
        "`Policy URL`": query_response[0][2],
        "`Policy collection date`": str(query_response[0][3])
        }

    return json.dumps(response_msg), 200

@app.route('/policy', methods = ['POST'])
def create_policy_object():
    data = request.get_json()

    if "sites" in data:
        return create_policy_objects(data)
    else:
        url = data.get("`Site URL`")
        comments = data.get("Comments")
        policy_url = data.get("`Policy URL`")
        last_fetch_date = data.get("`Policy collection date`")

        sql = f"INSERT INTO sites (`Site URL`, Comments, `Policy URL`, `Policy collection date`) VALUES (%s, %s, %s, %s);"
        execute_query(sql, (url, comments, policy_url, last_fetch_date))

        return json.dumps({"Policy URL": url}), 201

def create_policy_objects(data):
    policies_list = list()

    for policy in data.get("sites"):
        url = policy.get("Policy URL")
        rating = policy.get("Comments")
        subgroup_id = policy.get("`Policy URL`")
        last_fetch_date = policy.get("`Policy collection date`")

        sql = f"INSERT INTO sites (`Site URL`, Comments, `Policy URL`, `Policy collection date`) VALUES (%s, %s, %s, %s);"
        execute_query(sql, (url, rating, subgroup_id, last_fetch_date))

        policies_list.append({"Policy URL": url})

    return json.dumps({"sites": policies_list}), 201

@app.route('/policy', methods = ['PUT'])
def update_policy_object():
    data = request.get_json()
    url = data.get("Policy URL")

    if not does_task_exist(url):
        return no_policy_message()

    query_snippet = ""
    if "Comments" in data:
        comments = data.get("Comments")
        query_snippet = f"Comments = '{comments}'"
    if "Comments" in data and "Policy URL" in data:
        query_snippet += ", "
    if "Policy URL" in data:
        policy_url = data.get("Policy URL")
        query_snippet += f"Policy URL = {policy_url}"
    if ("`Policy URL`" in data and "`Policy collection date`" in data) or ("Comments" in data and "`Policy collection date`" in data):
        query_snippet += ", "
    if "`Policy collection date`" in data:
        last_fetch_date = data.get("`Policy collection date`")
        query_snippet += f"`Policy collection date` = '{last_fetch_date}'"

    sql = f"UPDATE sites SET {query_snippet} WHERE `Site URL` = (%s);"
    execute_query(sql, (url,))

    return '', 204

@app.route('/policy', methods = ['DELETE'])
def delete_policy_object():
    data = request.get_json()

    if "sites" in data:
        return delete_policy_objects(data)
    else:
        url = data.get("`Site URL`")

        sql = f"DELETE FROM sites WHERE `Site URL` = (%s);"
        execute_query(sql, (url,))

        return '', 204

def delete_policy_objects(data):
    data = request.get_json()
    tasks_to_delete = [item.get("`Site URL`") for item in data.get("sites")]

    for url in tasks_to_delete:
        sql = f"DELETE FROM sites WHERE `Site URL` = (%s);"
        execute_query(sql, (url,))

    return '', 204

#This function should be removed in a live application
@app.route('/reset', methods = ['PUT'])
def reset_table():
    execute_query("DELETE FROM sites;")
    execute_query("ALTER TABLE sites AUTO_INCREMENT = 1;")

    return '', 204
