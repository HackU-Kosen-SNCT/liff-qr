import axiosBase from 'axios'

const axios = axiosBase.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
})

export default axios
