import { makeRequest } from "./makeRequest";

export function getBooks() {
    return makeRequest('/books');
}

export function getBook(id) {
    return makeRequest(`/books/${id}`);
}

export function createBook(data) {
    return makeRequest('/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

export function updateBook(data, id) {
    return makeRequest(`/books/${id}`, {
        method: 'PUT',
        data
    })
}

export function deleteBook(id) {
    return makeRequest(`/books/${id}`, {
        method: 'DELETE'
    })
}