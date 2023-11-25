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

export function forgotPassword(data) {
    return makeRequest('/auth/forgotPassword', {
        method: 'POST',
        data,
    })
}

export function resetPassword(data) {
    return makeRequest('/auth/resetPassword', {
        method: 'POST',
        data
    })
}