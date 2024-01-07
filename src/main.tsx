import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import mainTheme from './themes/MainTheme.ts';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const cache = createCache({
  key: 'css',
  prepend: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <CacheProvider value={cache}>
          <App />
        </CacheProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
