# COMPSCI-299-Privacy-Flagger-Project
This is a repository for the Privacy Flagger Project at UC Berkeley. The project concerns developing a Google chrome extension for rating privacy policy agreements.

How to run:
1. Clone the project.
1. Start Docker
1. `cd` into Back_End and run `docker-compose up`
1. Wait until you see "ready for connections", then `cd` into `data_handling` and run `python3 data_to_sql.py`.
1. Open chrome://extensions in your chrome browser.
1. Change to developer mode.
1. Upload the Front_End folder by clicking “Load unpacked”.
1. See readme in backend for sample queries.
