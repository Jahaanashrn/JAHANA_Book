import React, { useEffect, useState } from 'react'
import './App.css'
import { getBooks } from './api'
import AddBookForm from './components/AddBookForm'
import BookList from './components/BookList'
import EditBookModal from './components/EditBookModal'
import DeleteConfirmationPopup from './components/DeleteConfirmationPopup'
import { AppBar, Toolbar, Container, Typography, Box, Button, Paper } from '@mui/material'

// Assumption: API base path is /api/books. If your backend uses a different base url,
// update axios defaults or prepend the correct base in the requests inside components.

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    setLoading(true)
    try {
      const resp = await getBooks()
      setBooks(resp)
    } catch (err) {
      console.error('Failed to fetch books', err)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  function handleAdd(newBook) {
    // Optimistic UI: add to front
    setBooks((prev) => [newBook, ...prev])
  }

  function handleUpdated(updatedBook) {
    setBooks((prev) => prev.map((b) => (b.id === updatedBook.id || b._id === updatedBook._id ? updatedBook : b)))
  }

  function handleDeleted(deletedBook) {
    const id = deletedBook.id ?? deletedBook._id
    setBooks((prev) => prev.filter((b) => (b.id ?? b._id) !== id))
  }

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box className="logo-box">JB</Box>
            <Box>
              <Typography variant="h6">Jahana Books</Typography>
              <Typography variant="caption" color="text.secondary">Clean, simple book management</Typography>
            </Box>
          </Box>
          <Box>
            <Button variant="outlined">Help</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" className="app-container">
        <Paper sx={{ p: 2, mb: 2 }} elevation={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Box>
              <Typography variant="h6">Manage your book collection</Typography>
              <Typography variant="body2" color="text.secondary">Add, edit, and remove books quickly. This is a client-only demo UI.</Typography>
            </Box>
            <Button variant="contained">Get started</Button>
          </Box>

          <AddBookForm onAdd={handleAdd} />
          {loading ? (
            <Box textAlign="center" py={4}>Loading books...</Box>
          ) : (
            <BookList books={books} onEdit={(b) => setEditing(b)} onDelete={(b) => setDeleting(b)} />
          )}
        </Paper>

        <EditBookModal show={!!editing} book={editing} onClose={() => setEditing(null)} onUpdated={handleUpdated} />
        <DeleteConfirmationPopup show={!!deleting} book={deleting} onClose={() => setDeleting(null)} onDeleted={handleDeleted} />

      </Container>
    </div>
  )
}

export default App
