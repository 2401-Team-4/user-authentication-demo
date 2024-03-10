import { useState } from "react"

import QuoteDetails from "./QuoteDetails"

const Quote = ({ quote, likeQuote, deleteQuote, user }) => {
  const [visible, setVisible] = useState(false)

  const quotestyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginRight: 20
  }

  return (
    <div className='quote' style={quotestyle} id={quote.title}>
      <h5 style={{ display: 'inline-block' }}>{`${quote.title}`} by {`${quote.author}`} </h5>
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      <QuoteDetails
        quote={quote}
        visible={visible}
        // likeQuote={likeQuote}
        deleteQuote={deleteQuote}
        user={user}
      ></QuoteDetails>
    </div>
  )
}

export default Quote