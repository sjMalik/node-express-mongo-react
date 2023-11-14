import { makeRequest } from './makeRequest';
import authHeader from './authHeader';

export function getAuthors() {
    return makeRequest('/authors', {
        headers: authHeader()
    });
}

export function getAuthor(id) {
    return makeRequest(`/authors/${id}`, {
        headers: authHeader()
    });
}

export function createAuthor(data) {
    return makeRequest('/authors', {
        headers: authHeader(),
        method: 'POST',
        data
    })
}

export function updateAuthor(id, data) {
    return makeRequest(`/authors/${id}`, {
        headers: authHeader(),
        method: 'PUT',
        data
    })
}

export function deleteAuthor(id) {
    return makeRequest(`/authors/${id}`, {
        headers: authHeader(),
        method: 'DELETE'
    })
}