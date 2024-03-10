import { useState } from 'react'

const AddQuoteForm = ({ addQuote }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const createQuote = async (e) => {
    e.preventDefault()

    const newQuote = { title, author }
    try {
      const success = await addQuote(newQuote)
      if (success) {
        setAuthor('')
        setTitle('')
      }
    } catch (e) {
      console.log({error: e})
    }
  }

  return (
    <>
      <form onSubmit={createQuote}>
        <Input value={title} name='title' handler={setTitle}/>
        <Input value={author} name='author' handler={setAuthor}/>
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