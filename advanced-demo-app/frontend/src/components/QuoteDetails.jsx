const QuoteDetails = ({ quote, visible, deleteQuote, user }) => {
  const creatorId = quote.user.id || quote.user
  const deleteVisible = creatorId === user.id

  const delQuote = async () => {
    if (window.confirm(`Remove ${quote.title} by ${quote.author}`)) {
      await deleteQuote(quote)
    }
  }

  if (!visible) return

  return (
    <>
      <p>Added by {quote?.user?.username || quote.username}</p>
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