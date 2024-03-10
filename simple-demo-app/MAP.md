# 👥 User Authentication ✅👌: Map

[TOC]

High level, technical view

## Frontend

### `./src/services/login.js`

#### `login()`

  called from within `loginUser` in `App.jsx` as `loginService.login`
  called asynchronously
  receives one argument, an object with two properties: `username` and `password`
  sends `POST` request to the backend, with that object as payload
  if successful (user exists in the database, and the password is correct), returns the object received from the backend, as a response:

  ```js
  { 
    token, // a cryptographically signed token by JWT, in the json web token format
    username: user.username, // the username which the user uses to log in
    name: user.name, // the name to display the user in the app
    id: user._id // the mongoDB user id
  }
  ```

  see ...

### `./src/App.jsx`

#### `loginUser()`

  passed as prop to the `LoginForm` component
  it takes two string arguments, `username` and `password`
  calls asynchronously `loginService.login()`, passing one object with two properties: `username` and `password`, whose values are the corresponding string arguments
  if successful, sets 

### `./src/components/LoginForm.jsx`