import axios from 'axios'
const baseUrl = 'http://localhost:3020/api/login'

let token = null // private variable to this module

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (e) {
    throw Error(e)
  }
}

const createQuote = async (newQuote) => {
  const config = { headers: {
    Authorization: token
  } }

  try {
    const response = await axios.post(baseUrl, newQuote, config)
    return response.data
  } catch(e) {
    throw Error(e)
  }
}

// const updateQuote = async (quote) => {
//   const quoteId = quote.id || quote._id

//   try {
//     const response = await axios.put(`${baseUrl}/${quoteId}`, quote)
//     return response.data
//   } catch (e) {
//     throw Error(e)
//   }
// }

const deleteQuote = async (quote) => {
  const config = { headers: {
    Authorization: token
  } }

  const quoteId = quote.id || quote._id
  try {
    const response = await axios.delete(`${baseUrl}/${quoteId}`, config)
    return response.data
  } catch (e) {
    throw Error(e)
  }
}

// export default { getAll, setToken, createQuote, updateQuote, deleteQuote }
export default { getAll, setToken, createQuote, deleteQuote }