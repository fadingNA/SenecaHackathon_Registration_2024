import { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
const rootElement = document.getElementById('root');

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#D92D27',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#F3F3F3',
    },
  },
  typography: {
    h1: {
      fontWeight: 1000,
      letterSpacing: '0.01em',
      fontSize: '3.1rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.2rem',
    },
    subtitle2: {
      fontSize: '0.9rem',
    },
  },
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
};

const mainTheme = createTheme(themeOptions);

export default mainTheme;
