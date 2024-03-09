
const baseUrl = 'http://localhost:3019/api/login'

let token = null // private variable to this module

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default {setToken}