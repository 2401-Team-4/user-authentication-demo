# 👥 User Authentication ✅👌: How it works

## Adding users

A user is manually added to the MongoDB, via a `POST` request to the backend server (you did this step following the 'How to Run' section in [`README.md`](../README.md))

1. The [users router](./backend/controllers/users.js) receives the request.
2. If the password is valid, it will create a hash from that password, with certain amount of salt rounds.
3. Then, it will create a user object following the [`User` Mongo schema](./backend/models/user.js), and store it into the database.
4. The Mongo database will return a Mongo object with the recently added user data; this object will be converted to the JSON format and sent back as a response to confirm the user was created.

## Users login

1. If successful, the response contains a JSON object representing the MongoDB User object just added (step 4 in previous section). Note that the password is not stored literally, but it is hashed and salted.
2. The user enters a username and a password (the user's **credentials**) in the login form.
3. The credentials are sent in a `POST` request to the backend server via the [login service](./frontend/src/services/login.js).
4. The backend [login router](./backend/controllers/login.js) receives the request, validating the credentials if:
    - the user with that username exists in the database
    - **the hashed version of the password received is equal to the hashed version of the password stored in the database** (compared cryptographically by `bcrypt`).
5. If the credentials are validated, the login router creates a cryptographically signed token with the JSON Web Token format (via the `jwt` library) and sends as a response:
    - the crypto-signed token
    - some user data (`name`, `username` and the database `id`).
6. When the frontend receives that response: 
    - stores the crypto-signed JSON Web Token in the browser's local storage. See lines 29-42 in [App.jsx](./frontend/src/App.jsx).
    - sets the React `user` variable to the received object (token plus the user data).

## Persisting encrypted sessions

This is how users are authenticated, and how persisting sessions are created via cryptographically signed tokens. The next time the user visits the web app:

1. The frontend app reads the browser's local storage and if:
    - there is a token with the appropriate format
    - the token **is not expired **(it lasts one hour, this is set when the token is created)
2. It will load the content appropriate to the owner of that token. If not, the user will see the login form again.