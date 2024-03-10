import { useState } from "react"

const QuoteDetails = ({ quote, visible, likeQuote, deleteQuote, user }) => {
  // const [likes, setLikes] = useState(quote.likes)
  const creatorId = quote.user.id || quote.user
  const deleteVisible = creatorId === user.id

  // const like = async () => {
  //   quote.likes += 1
  //   await likeQuote(quote)
  //   setLikes(likes + 1)
  // }

  const delQuote = async () => {
    if (window.confirm(`Remove ${quote.title} by ${quote.author}`)) {
      await deleteQuote(quote)
    }
  }

  if (!visible) return

  return (
    <>
      <p>{quote.url}</p>
      {/* <p style={{ display: 'inline-block' }}>likes {likes}</p> */}
      {/* <button className='like' onClick={like}>like</button> */}
      <p>{quote?.user?.username || quote.username}</p>
      {deleteVisible &&
        <button
          className='delete'
          onClick={delQuote}
        >delete</button>
      }
    </>
  )
}

export default QuoteDetails