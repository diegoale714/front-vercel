import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://vercel-back3.onrender.com',
})

export default instance
