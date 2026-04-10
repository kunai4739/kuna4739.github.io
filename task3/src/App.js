import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Projects from './components/Projects';

const theme = createTheme({
  palette: {
    primary: { main: '#1a1a2e' },
    secondary: { main: '#e94560' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Projects />
    </ThemeProvider>
  );
}

export default App;
