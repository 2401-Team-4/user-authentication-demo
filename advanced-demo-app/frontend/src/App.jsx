import { useState, useEffect } from 'react'
import './App.css'

import loginService from './services/login'
import quoteService from './services/quotes'
import LoginForm from './components/LoginForm'

import QuoteList from './components/QuoteList'
import AddQuoteForm from './components/AddQuoteForm'
import Notification from './components/Notification'

function App() {
  const [quotes, setQuotes] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    quoteService.getAll().then(quotes => {
      setQuotes(quotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedQuotelistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      quoteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedQuotelistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      quoteService.setToken(user.token)
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

  const addQuote = async (newQuote) => {
    try {
      const addedQuote = await quoteService.createQuote(newQuote)
      setQuotes(quotes.concat(addedQuote))
      displayNotification({
        type: 'success',
        message: `a new quote ${addedQuote.title} by ${addedQuote.author} added`
      })
      return addedQuote
    } catch (e) {
      displayNotification({ type: 'fail', message: 'Invalid quote' })
      throw Error(e)
    }
  }

  const deleteQuote = async (quote) => {
    try {
      await quoteService.deleteQuote(quote)
      const newQuotelist = filterDeleted(quote.id || quote._id)
      setQuotes(newQuotelist)
      displayNotification({ type: 'success', message: 'Quote deleted' })
    } catch (e) {
      throw Error(e)
    }
  }

  const filterDeleted = idToDelete => {
    return quotes.filter(quote => {
      const quoteId = quote.id || quote._id
      return quoteId !== idToDelete
    })
  }

  const loginForm = () => {
    return (
      <LoginForm loginUser={loginUser}/>
    )
  }

  const loggedUserUI = () => {
    return (
      <>
        <h4>Hello {user.name}</h4>
        <button onClick={handleLogout}>logout</button>
        <AddQuoteForm addQuote={addQuote} />
        <QuoteList
          quotes={quotes}
          deleteQuote={deleteQuote}
          user={user}
        />
      </>
    )
  }

  return (
    <div>
      <Notification notification={notification}/>
      <h2>Quotelist</h2>
      {user ? loggedUserUI() : loginForm()}
    </div>
  )
}

export default App
