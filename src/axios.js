import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://back-vercel-v3.onrender.com',
})

export default instance
