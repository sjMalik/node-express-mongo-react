import { makeRequest } from "./makeRequest";
import authHeader from "./authHeader";

export function getBooks() {
    return makeRequest('/books', {
        headers: authHeader(),
    });
}

export function getBook(id) {
    return makeRequest(`/books/${id}`, {
        headers: authHeader(),
    });
}

export function createBook(data) {
    return makeRequest('/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            ...authHeader(),
        },
        data
    })
}

export function updateBook(data, id) {
    return makeRequest(`/books/${id}`, {
        headers: authHeader(),
        method: 'PUT',
        data
    })
}

export function deleteBook(id) {
    return makeRequest(`/books/${id}`, {
        headers: authHeader(),
        method: 'DELETE'
    })
}