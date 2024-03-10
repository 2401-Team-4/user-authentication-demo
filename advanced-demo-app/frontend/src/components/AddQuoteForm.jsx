import { useState } from 'react'

const AddQuoteForm = ({ addQuote }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const createQuote = async (e) => {
    e.preventDefault()

    const newQuote = { title, author, url }

    const success = await addQuote(newQuote)
    if (success) {
      setAuthor('')
      setTitle('')
      setURL('')
    }
  }

  return (
    <>
      <h4>Create new</h4>
      <form onSubmit={createQuote}>
        <Input value={title} name='title' handler={setTitle}/>
        <Input value={author} name='author' handler={setAuthor}/>
        <Input value={url} name='url' handler={setURL}/>
        <button className='add-quote' type="submit">Add new quote</button>
      </form>
    </>
  )
}

const Input = ({ value, name, handler }) => {
  const placeholder = `${name.charAt(0).toUpperCase()}${name.slice(1)}...`

  return (
    <input
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={e => handler(e.target.value)}
    ></input>
  )
}

export default AddQuoteForm