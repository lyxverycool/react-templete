import axios from 'axios'
// eslint-disable-next-line import/no-cycle
import { getLaguange } from '~/utils'

const http = axios.create({
  baseURL: '/api'
})
const fetch = ({ url, params, method = 'GET', data }) => {
  const options = {
    url,
    method,
    params,
    data,
    timeout: 300000,
    withCredentials: true,
    headers: {
      'Accept-Language': getLaguange()
    }
  }
  return new Promise((resolve, reject) => {
    http(options)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default fetch
