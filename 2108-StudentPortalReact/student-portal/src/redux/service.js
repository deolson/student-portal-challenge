import axios from 'axios'

export const url = 'http://localhost:9005'

export const service = {
  login
}

const instance = axios.create({
  withCredentials: true
})

async function login (username, password) {
  const axiosResponse = await instance.post(url + '/authenticate', {
    username: username,
    password: password
  })
  const axiosData = axiosResponse.data
  console.log(axiosData)
  return axiosData
}
