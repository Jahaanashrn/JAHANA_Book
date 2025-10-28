import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'
import { deleteBook } from '../api'

export default function DeleteConfirmationPopup({ show, book, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      const id = book.id ?? book._id
      await deleteBook(id)
      onDeleted && onDeleted(book)
      onClose && onClose()
    } catch (err) {
      console.error('Delete failed', err)
      alert('Failed to delete')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={!!show} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete "{book?.title}"?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button color="error" variant="contained" onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
