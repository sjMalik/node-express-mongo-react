import { makeRequest } from './makeRequest';

export function getAuthors() {
    return makeRequest('/authors');
}

export function getAuthor(id) {
    return makeRequest(`/authors/${id}`);
}

export function createAuthor(data) {
    return makeRequest('/authors', {
        method: 'POST',
        data
    })
}

export function updateAuthor(id, data) {
    return makeRequest(`/authors/${id}`, {
        method: 'PUT',
        data
    })
}

export function deleteAuthor(id) {
    return makeRequest(`/authors/${id}`, {
        method: 'DELETE'
    })
}