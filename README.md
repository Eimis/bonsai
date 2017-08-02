# bonsai

Start the backend API server:

* clone this repo: [bonsai](https://github.com/Eimis/oak)
* run `docker-compose up`
* Congratulations, API server is now running!
* You can visit `http://localhost:8000/game/log` to see if the API server works

Start the frontend app:

* clone this repo
* run `docker-compose up`
* Congratulations, app is now running!


* Visit `http://localhost:3000/#/`


To run some *very basic* tests for backend API:

open container's shell:
`docker exec -it oak_web_1 bash`
run tests:
`oak/manage.py test oak`
