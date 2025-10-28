// Simple API abstraction that can be switched between MOCK mode and real axios-backed mode.
// Set MOCK = true to run purely in-memory so the UI works without a backend.

import axios from 'axios'

export const MOCK = true

// Mock data
let _id = 3
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  { id: 2, title: '1984', author: 'George Orwell', year: 1949 },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
]

function wait(ms = 150) {
  return new Promise((res) => setTimeout(res, ms))
}

export async function getBooks() {
  if (MOCK) {
    await wait()
    // return a shallow copy
    return [...books]
  }
  const resp = await axios.get('/api/books')
  return resp.data
}

export async function createBook(data) {
  if (MOCK) {
    await wait()
    const newBook = { id: ++_id, ...data }
    books = [newBook, ...books]
    return newBook
  }
  const resp = await axios.post('/api/books', data)
  return resp.data
}

export async function updateBook(id, data) {
  if (MOCK) {
    await wait()
    books = books.map((b) => (b.id === id || b._id === id ? { ...(b.id === id ? b : {}), ...data, id } : b))
    const updated = books.find((b) => b.id === id || b._id === id)
    return updated
  }
  const resp = await axios.put(`/api/books/${id}`, data)
  return resp.data
}

export async function deleteBook(id) {
  if (MOCK) {
    await wait()
    const deleted = books.find((b) => b.id === id || b._id === id)
    books = books.filter((b) => b.id !== id && b._id !== id)
    return deleted
  }
  const resp = await axios.delete(`/api/books/${id}`)
  return resp.data
}
