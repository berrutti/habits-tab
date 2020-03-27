import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4062bb',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          backgroundImage: 'linear-gradient(0deg, rgba(46,120,227,1) 50%, rgba(46,149,227,1) 100%)',
          minHeight: '100%',
        },
      },
    },
  },
});

export default theme;
