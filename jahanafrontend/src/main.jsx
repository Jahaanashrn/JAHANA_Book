import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: { main: '#4f46e5' },
    secondary: { main: '#06b6d4' },
  },
  typography: { fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto" },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
