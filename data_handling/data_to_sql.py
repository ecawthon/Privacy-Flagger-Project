import pandas as pd
import numpy as np
import nltk
import mysql.connector
from sqlalchemy import create_engine
from os import listdir
import re
from lxml import etree, html
import json
import time

engine = create_engine("mysql+pymysql://root:my-secret-pw@127.0.0.1/policy-db")

def read_sites():
    # Read in sites, including those not covered by the OPP-115 corpus.
    sites = pd.read_csv('OPP-115/documentation/websites_covered_opp115.csv',
            index_col=3,parse_dates=[4])
    print(sites.head())

    # Change interpretation of 115 set membership column
    sites['In 115 Set?']=sites['In 115 Set?'] \
        .apply(lambda yn: True if yn == 'Yes' else False)

    # Reinterpret the categories for the sites. Find the primary category and take
    # the mode across all columns
    sectors = sites[sites.columns[6:]]
    sectors = sectors.applymap(lambda s: str(s).split(':')[0])

    s = []
    for i in range(0,sectors.shape[0]):

        sec = sectors.iloc[i][sectors.iloc[i]!='nan'].mode()
        sec = sec.iloc[0] if len(sec) > 0 else 'None'
        s.append(sec)

    # Drop and append
    sites = sites.drop(sites.columns[6:], axis=1)
    sites['Sector'] = s

    #Grab the policies table
    policies = pd.read_csv('OPP-115/documentation/policies_opp115.csv',
            index_col=0,parse_dates=[2,3])
    policies = policies.drop('Unnamed: 4',axis=1)
    print(policies.head())

    # Grab the original policy text from html and append to this table
    base_dir = 'OPP-115/sanitized_policies/'
    files = [f for f in listdir(base_dir) if f.endswith('.html')]

    txt = []
    pids = []
    for f in files:
        with open(base_dir + f, 'r') as pg:
            #print('Reading: ' + f)
            page = pg.read()
            txt.append(page)
            pid = int(f.split('_')[0])
            pids.append(pid)

    # Create dataframe of texts and join it to policies frame
    txts = pd.DataFrame({'policy_text': txt},index=pids)
    txts.index.name = 'Policy UID'
    # update existing policies table
    policies.to_sql('policies', con=engine, if_exists='replace')
    policies = pd.merge(policies,txts,left_index=True,right_index=True,how='outer')

    #Now merge the sites and policies tables
    sites = pd.merge(sites,policies,left_index=True,right_index=True,how='outer')
    sites.info()
    sites.index.nunique()

    sites.to_sql('sites', con=engine, if_exists='replace')
    return sites

def read_annotations():
    # Locate the files
    ann_dir = 'OPP-115/annotations/'
    files = [f for f in listdir(ann_dir) if f.endswith('.csv')]

    #Set up name conventions and data conversions for import
    names = """annotation_id
            batch_id
            annotator_id
            policy_id
            segment_id
            category_name
            attributes_value_pairs
            date
            policy_url""".split()

    types = {'annotation_id': int,
            'batch_id': str,
            'annotator_id': int,
            'policy_id': int,
            'segment_id': int,
            'category_name': str}

    ann_list = []
    pids = []
    for f in files:
        df = pd.read_csv(ann_dir + f, header=None, names=names,
                na_values={'date': 'Not specified'}, parse_dates=[7],index_col=0)
        ann_list.append(df)
        pids.append(int(f.split('_')[0]))

    annotations = pd.concat(ann_list,axis=0,keys=pids,
            names=['Policy UID','annotation_id'])
    annotations = annotations.drop('policy_id',axis=1)

    annotations.info()

    attr_values = pd.DataFrame(data=None,
            columns=['annotation_id','start_idx','end_idx','attribute',
                'text','value'])
    template = dict\
        .fromkeys('startIndexInSegment endIndexInSegment selectedText value'
                .split())

    #BATCH PROCESSING OF ATTRIBUTE-VALUE PAIRS: THIS NEEDS TO BE DONE MANUALLY!
    attr_values1 = pd.DataFrame(data=None,columns=['annotation_id','start_idx',
        'end_idx','attribute','text','value'])
    t0 = time.time()
    print('Starting at ' + str(t0))
    for i in range(22001,annotations.shape[0]):    #Note manual adjustment of batch size here...

        attr_val = annotations['attributes_value_pairs'].iloc[i]
        ann_id = annotations.index.values[i][-1]

        obj = json.loads(attr_val)
        keys = list(obj.keys())

        for k in keys:
            obj2 = dict(template, **obj[k]) #Ensures at a minimum we get the empty template data.
            df = pd.DataFrame({'annotation_id': [ann_id],
                               'start_idx': [obj2['startIndexInSegment']],
                               'end_idx': [obj2['endIndexInSegment']],
                               'attribute': [k],
                               'text': [obj2['selectedText']],
                               'value': [obj2['value']]})
            attr_values1 = attr_values1.append(df,ignore_index=True)
    t1 = time.time()
    print('Finished at ' + str(t1))
    print('Total elapsed time ' + str(t1-t0))
    attr_values = attr_values.append(attr_values1,ignore_index=True)
    attr_values.info()

    #Set up indices
    attr_values.index.name = 'text_selection_id'
    attr_values = attr_values.set_index(['annotation_id'], append=True)\
        .reorder_levels(['annotation_id','text_selection_id'])

    attr_values = attr_values.rename(columns={'text':'text_selection'})

    attr_values['text_selection']\
            [(attr_values['text_selection'].isnull()) |\
             (attr_values['text_selection'] == 'null')] = 'Not selected'
    attr_values['text_selection']

    #Persist all of this crap to a new table. Phew!
    annotations.to_sql('annotations', engine, if_exists='replace')
    attr_values.to_sql('text_selections_new', engine, if_exists='replace')

    # Pretty annotation tables
    pretty_dir = 'OPP-115/pretty_print/'
    files = [f for f in listdir(pretty_dir) if f.endswith('.csv')]

    test = pd.read_csv(pretty_dir + files[0],header=None,
            names=['annotation_id','segment_id', 'annotator_id','pretty_string'])
    test = test.set_index(['annotation_id'],append=False)

    names = """annotation_id
            segment_id
            annotator_id
            pretty_string""".split()

    types = {'annotation_id': int,
            'segment_id': int,
            'annotator_id': int,
            'pretty_string': str}

    pretty_list = []
    for f in files:
        df = pd.read_csv(pretty_dir + f,header=None,names=names,index_col=0,dtype=types)
        pretty_list.append(df)

    pretty = pd.concat(pretty_list)
    print(pretty.head())
    pretty.to_sql('pretty_strings', engine, if_exists='replace')

def read_segments(sites):
    print(sites.head())

    #First grab policy text from the sites table to parse down
    policies = pd.DataFrame(sites['policy_text'])
    policies.head()

    #For each policy, create a dataframe of segments with unique segment index
    dfs = []
    for i in range(0,policies.shape[0]):
        tmp = pd.DataFrame(policies['policy_text'].iloc[i].split('|||'),
                columns=['segments'])
        tmp['Policy UID'] = policies.index.values[i]
        tmp.index.name = 'segment_id'
        dfs.append(tmp)

    segments = pd.concat(dfs,axis=0).reset_index()\
            .set_index(['Policy UID','segment_id'])

    #Create table
    segments.to_sql('segments', engine, if_exists='replace')

sites = read_sites()
read_annotations()
read_segments(sites)
