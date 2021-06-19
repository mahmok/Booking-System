# Booking System

This is a simple appointment booking system app, written in Python (Flask) and Typescript (React).

## How to run

### Docker Environemnt

1. Make sure docker is up and running.
2. Run `docker compose up` if you are running the latest version of docker or run `docker-compose up` for older versions.

__Note__ By default backend uses a SQLite database, to use another SQL database you can add a Database service in the docker-compose.yml and change the backend `config.json` to point to the database.

If you want to use a database server outside Docker context, just update the `config.json`

### Manual Run
* Backend

    1. Install Python3
    2. Navigate to the backend folder `booking_system`
    3. Rename `config.json.example` to `config.json`. This is the app configuration you are free to update it.
    4. (Optional) Create a python virtual environment.
    5. Run `pip install -r requirements.txt` to install all dependencies.
    6. Run `python app.py`    

* Frontend

    1. Install Node
    3. Navigate to the frontend folder `booking_system_react`
    4. Rename `.env.example` to `.env`. This is the app configuration you are free to update it.
    2. Run `npm i`
    3. Run `npm start`


Backend by default runs on port `5000` and the frontend runs on port `3005` (Not `80` just to avoid collision if you are running other services on port 80).

#### Updating Ports
__Backend:__ Just update the config.json file.

__Frontend:__ Update both `nginx/nginx.conf` and `.env` 



## Important Notes
___
This app was developed for demonstration purposes and it is missing stuff to be able to use it for production.

## Things that can be improved
1. Increase unit tests coverage.
2. Abstract database access and manipulation layer and split it from the controller classes. So that it is flexible to use different types of databases if we needed to. Currently it is coupled.
3. Normalize user roles in the `users` table. Currently it is dernomalized which is better and easier when querying but may introduce some anamolies.
4. Add roles and permissions module so that it is flexible and extensible to manage users and their permissions to do certain tasks. Currently it is done using if-else conditions based on user role. Which won't be scalable if we wanted to add more roles/permissions.
5. Add custom exception classes instead of using native Python exception class. This way we could return sensible error reponses from the backend and use sensible status codes.
6. Add a wsgi server to the backend. Using Flask server is not for production.
7. Frontend UI/UX is really bad and needs rework.