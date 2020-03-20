import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(46,149,227,1)',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#f66'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%'
        },
        body: {
          backgroundImage: 'linear-gradient(0deg, rgba(46,120,227,1) 50%, rgba(46,149,227,1) 100%)',
          minHeight: '100%'
        }
      }
    }
  }
});

export default theme;
