import pandas as pd
import numpy as np
import nltk
import mysql.connector
import pymysql
from sqlalchemy import create_engine

engine = create_engine("mysql+pymysql://root:my-secret-pw@127.0.0.1/policy-db")

# cnx = mysql.connector.connect(user='root', password='my-secret-pw',
#         host='127.0.0.1', database='policy-db')
# print(cnx.connection_id)
        # host='172.18.0.2', database='policy-db')
# cursor = cnx.cursor()
sites = pd.read_csv('OPP-115/documentation/websites_covered_opp115.csv',
        index_col=3,parse_dates=[4])
print(sites.head())
sites.to_sql('sites', con=engine, if_exists='replace')
print("saved csv contents to sql")
query = ("select * FROM sites;")
result_dataFrame = pd.read_sql(query, engine)
print(result_dataFrame.head())
# cnx.close()
