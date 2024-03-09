import { useState, useEffect, useRef } from 'react'
import './App.css'

import loginService from './services/login'
import quoteService from './services/general'
import LoginForm from './components/LoginForm'

// import Toggable from './components/Toggable'


function App() {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  // const quoteFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // quoteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // quoteService.setToken(user.token)
    }
  }, [])

  const loginUser = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedQuotelistUser', JSON.stringify(user)
      )

      quoteService.setToken(user.token)
      setUser(user)
      return true
    } catch (exception) {
      displayNotification({ type: 'fail', message: 'Wrong credentials' })
    }
  }

  const displayNotification = (notification, delay=4000) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, delay)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const loginForm = () => {
    return (
      // <Toggable buttonLabel='log in'>
      // </Toggable>
      <LoginForm loginUser={loginUser}/>
    )
  }

  const loggedUserUI = () => {
    return (
      <>
        <h4>Hello {user.name}</h4>
        <button onClick={handleLogout}>logout</button>
        <p>You are in!</p>
      </>
    )
  }

  return (
    <div>
      <Header/>
      <Notification notification={notification}/>
      {user ? loggedUserUI() : loginForm()}
    </div>
  )
}

const Header = () => {
  return <h2>Quotelist</h2>
}

const Notification = ({ notification }) => {
  if (!notification) return

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  )
}

export default App
