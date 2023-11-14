import { makeRequest } from "./makeRequest";

export function register(data) {
    return makeRequest('/auth/signup', {
        method: 'POST',
        data
    })
}

export function login(data) {
    return makeRequest('/auth/signin', {
        method: 'POST',
        data
    })
}