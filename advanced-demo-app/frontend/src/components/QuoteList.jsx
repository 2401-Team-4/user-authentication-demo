import Quote from "./Quote"

const QuoteList = ({ quotes, likeQuote, deleteQuote, user }) => {
  if (!quotes) return

  return (
    <ul className='quotelist'>
      {quotes.map(quote => {
        return (
          <Quote
            key={quote.id}
            quote={quote}
            // likeQuote={likeQuote}
            deleteQuote={deleteQuote}
            user={user}
          />
        )
      })}
    </ul>
  )
}

export default QuoteList