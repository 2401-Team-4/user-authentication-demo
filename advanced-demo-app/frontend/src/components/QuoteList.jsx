import Quote from "./Quote"

const QuoteList = ({ quotes, deleteQuote, user }) => {
  if (!quotes) return

  return (
    <ul className='quotelist'>
      {quotes.map(quote => {
        return (
          <Quote
            key={quote.id || quote._id}
            quote={quote}
            deleteQuote={deleteQuote}
            user={user}
          />
        )
      })}
    </ul>
  )
}

export default QuoteList