import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material'
import { updateBook } from '../api'

export default function EditBookModal({ show, book, onClose, onUpdated }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (book) {
      setTitle(book.title || '')
      setAuthor(book.author || '')
      setYear(book.year ?? '')
    }
  }, [book])

  async function handleSave() {
    setLoading(true)
    try {
      const id = book.id ?? book._id
      const resp = await updateBook(id, {
        title,
        author,
        year: year ? Number(year) : undefined,
      })
      onUpdated && onUpdated(resp)
      onClose && onClose()
    } catch (err) {
      console.error('Update failed', err)
      alert('Failed to update book')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={!!show} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Book</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12}>
            <TextField label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField label="Author" fullWidth value={author} onChange={(e) => setAuthor(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Year" fullWidth type="number" value={year} onChange={(e) => setYear(e.target.value)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
