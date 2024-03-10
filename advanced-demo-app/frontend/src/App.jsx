import { useState, useEffect, useRef } from 'react'
import './App.css'

import loginService from './services/login'
import quoteService from './services/quotes'
import LoginForm from './components/LoginForm'

import QuoteList from './components/QuoteList'
import AddQuoteForm from './components/AddQuoteForm'

function App() {
  const [quotes, setQuotes] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  // const quoteFormRef = useRef()

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
        {/* <Toggable buttonLabel='new quote' ref={quoteFormRef}>
        </Toggable> */}
        <AddQuoteForm addQuote={addQuote} />
        <QuoteList
          quotes={quotes}
          // likeQuote={likeQuote}
          deleteQuote={deleteQuote}
          user={user}
        />
      </>
    )
  }

  const addQuote = async (newQuote) => {
    try {
      const addedQuote = await quoteService.createQuote(newQuote)
      // quoteFormRef.current.toggleVisibility()
      // const sorted = sortByLikes(quotes.concat(addedQuote))
      setQuotes(quotes.concat(addedQuote))
      displayNotification({
        type: 'success',
        message: `a new quote ${addedQuote.title} by ${addedQuote.author} added`
      })
      return addedQuote
    } catch (e) {
      throw Error(e)
    }
  }

  // const likeQuote = async (quote) => {
  //   try {
  //     await quoteService.updateQuote(quote)
  //   } catch (e) {
  //     throw Error(e)
  //   }
  // }

  const deleteQuote = async (quote) => {
    try {
      await quoteService.deleteQuote(quote)
      const newQuotelist = filterDeleted(quote.id || quote._id)
      // const sorted = sortByLikes(newQuotelist)
      setQuotes(newQuotelist)
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

  // in decreasing order of likes
  // const sortByLikes = (quotes) => {
  //   return quotes.sort((a, b) => (b.likes - a.likes ))
  // }

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
