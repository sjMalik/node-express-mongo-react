import { makeRequest } from './makeRequest';

export function signup(data) {
    return makeRequest('/auth/signup', {
        method: 'POST',
        data
    })
}

export function signin(data) {
    return makeRequest('/auth/signin', {
        method: 'POST',
        data
    })
}