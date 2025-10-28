import React, { useState } from 'react'
import { Box, Grid, TextField, Button } from '@mui/material'
import { createBook } from '../api'

export default function AddBookForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const resp = await createBook({
        title,
        author,
        year: year ? Number(year) : undefined,
      })
      onAdd && onAdd(resp)
      setTitle('')
      setAuthor('')
      setYear('')
    } catch (err) {
      console.error('Add book failed', err)
      alert('Failed to add book')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            size="small"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <TextField
            fullWidth
            label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="number"
            size="small"
          />
        </Grid>
        <Grid item xs={6} md={1}>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
