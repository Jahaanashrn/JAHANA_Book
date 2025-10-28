import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function BookList({ books, onEdit, onDelete }) {
  if (!books || books.length === 0) {
    return (
      <Box py={6} textAlign="center">
        <Typography color="text.secondary">No books found</Typography>
      </Box>
    )
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 60 }}>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell sx={{ width: 120 }}>Year</TableCell>
            <TableCell sx={{ width: 140 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((b, i) => (
            <TableRow key={b.id ?? b._id ?? i} hover>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.author}</TableCell>
              <TableCell>{b.year || '-'}</TableCell>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton size="small" onClick={() => onEdit && onEdit(b)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small" color="error" onClick={() => onDelete && onDelete(b)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
