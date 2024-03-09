import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import loginService from './services/login'
import quoteService from './services/quoteService'
import LoginForm from './components/LoginForm'

function App() {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      quoteService.setToken(user.token)
    }
  }, [])

  return (
    <>
    </>
  )
}

export default App
