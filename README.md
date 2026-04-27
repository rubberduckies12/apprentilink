# apprentilink
ApprentiLink is a website which suggests apprenticeships to students based on Location, Apprenticeship Level etc. Candidates can mark themselves as 'interested' on a job posting, and then companies can make a shortlist out of the list of 'interested' students.

The idea is that the users of ApprentiLink will be students who reached the interview stage at Airbus (or potentially similar companies in future) but got rejected. The companies posting jobs on ApprentiLink will then have the prior knowledge that all 'interested' students were recognised highly by Airbus.

# Dev setup
This project was developed briefly in early 2026, and has been put on hold.
Here is the current status of development in this repo:

## main branch
Early version of the front-end and backend, in preparation for a production-ready app.
No REST API endpoints available.
The overall design of the ApprentiLink site was decided after this branch was made, so it is inaccurate (and inactive)

## db-setup branch
Minimal functioning backend REST API, which connects to a Postgres database.
Endpoints can be used to add users, jobs and create matches between them.
No login or accounts system.

## front-end branch
Minimal front-end with links between pages. No link to backend.
Pages are separate to the framework used on the main branch - needs integrating into React.
