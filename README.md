# 👥 User Authentication ✅👌: Readme

## What is this

This repo contains two web applications, `simple-semo-app` and `advanced-demo-app`. The first contains a very basic user authentication system: the user can log in and logout. The system will validate the user's credentials. The latter is more involved: on top of the user authentication system, it is a Quotelist app that allows users to add quotes by famous people. It has a basic CRUD functionality, with the caveat that only authenticated users will be able to perform CRUD operations like adding or deleting quotes. To see how this is achieved, please visit the appropriate `HOW_IT_WORKS.md` file in each app folder.

The purpose of these applications is to demo how user authentication is implemented, using security standards like encryption, hashing, salting, JSON web tokens, etc.

Because this app is to be used as a reference, and for demo purposes only, it does not include test suites of any kind. Tests will be demoed in a separate repository.

## How to run

1. Clone this repository into your machine.
2. Run the command `npm install` from within the `backend` and `frontend` folders in both applications.
3. Add the environment to both applications: to do this, go to the `backend` folder in `simple-demo-app` and create an `.env` file with the following content:

    ```sh
    PORT=3019
    MONGODB_URI=<add a mongoDB URI>
    SECRET=supersecret
    ```

4. Do the same in the `backend` folder within `advanced-demo-app`. This time, set `PORT` to `3020`, not `3019`.
5. Go to the `backend` folder in `simple-demo-app` and run the command `npm run dev`.
6. Add a user to the database: via Postman, Insomnia, or other equivalent, make a `POST` request to the backend server user API (URL: `http://localhost:3019/api/users`), with the following JSON content as a payload:

    ```json
    {
      "username": "test",
      "name": "test",
      "password": "1234"
    }
    ```

    Of course, you can set these to whatever values you like. `username` is the name of the account, the one you will enter on the login form to access the app. `name` is the name that is displayed publicly. **Don't forget to add a header `Content-Type: application/json` to the request**. As both application share the Mongo database, you only need to do this once: you will be able to access.

7. Go to the `frontend` folder within `simple-app-demo` and run the command `npm run dev`. Visit the app URL you will see on your terminal. By default, it will be <http://localhost:5173/>.
8. To use the `advanced-demo-app`, go the `backend` and `frontend` folders within `advanced-demo-app` and run `npm run dev` in both, to then visit the frontend URL. If you left the `simple-demo-app` running, it will be <http://localhost:5174/>, if not, it will be <http://localhost:5173/>.




