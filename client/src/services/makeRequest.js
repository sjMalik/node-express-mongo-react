import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

export function makeRequest(url, options) {
    return api(url, options)
        .then(res => res.data)
        .catch(error => Promise.reject(error?.response?.data?.message ?? 'Error'))
}