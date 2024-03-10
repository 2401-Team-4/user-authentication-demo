# 👥 User Authentication ✅👌: Ingredients and Recipe

[TOC]

This is a list of all the components, libraries, and functions actively involved in the user authentication process, plus a basic recipe. This is to be used as a reference. For a more detailed and technical view, please visit the application [MAP](MAP.md).

## Frontend

- `./src/services/login.js`

    - `login()`

- `window.localStorage`

- `./src/App.jsx`

    - `loginUser()`

    - `user`

    - `setUser()`

    - `handleLogout()`

    - `loggedUserUI()`

- `./src/components/LoginForm.jsx`

## Backend

- External libraries

    - `bcrypt`
    - `jsonwebtoken`

- `controllers/`

    - `login.js`

        - `post('/', ...)` route 

    - `users.js`

        - `get('/', ...)` route
        - `post('/', ...)` route

- `models/`

    - `user.js`

        - `User` (MongoDB Schema)

- `utils/`

    - `middleware.js`

        - `tokenExtractor()`
        - `userExtractor()`
