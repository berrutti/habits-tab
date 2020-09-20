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
          backgroundImage: 'linear-gradient(0deg, #F5F8FD 50%, #FFFFFF 100%)',
          minHeight: '100%',
        },
      },
    },
  },
});

export default theme;
