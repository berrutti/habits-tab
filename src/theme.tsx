import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2E95E3',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          backgroundColor: '#F5F8FD',
          minHeight: '100%',
        },
      },
    },
  },
});

export default theme;
