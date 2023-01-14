import { FC, PropsWithChildren } from 'react';
import {
  ThemeProvider as MThemeProvider,
  createTheme,
  CssBaseline,
  GlobalStyles,
  createStyles,
} from '@mui/material';
import JetBrainsMonoBoldWoff from '../assets/fonts/JetBrainsMono-Bold.woff';
import JetBrainsMonoBoldWoff2 from '../assets/fonts/JetBrainsMono-Bold.woff2';

const fontFamily = [
  '"JetBrains Mono"',
  'Roboto',
  '"Helvetica Neue"',
  'sans-serif',
].join(',');

const theme = createTheme({
  palette: {
    red: '#F64A4A',
    orange: '#FB7C58',
    yellow: '#F8CD65',
    greenNeon: '#A4FFAF',
    white: '#E6E5EA',
    greyDark: '#24232C',
    greyVeryDark: '#18171F',
  },
  typography: {
    fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
            font-family: 'JetBrains Mono';
            src: url(${JetBrainsMonoBoldWoff2}) format('woff2'),
                url(${JetBrainsMonoBoldWoff}) format('woff');
            font-weight: bold;
            font-style: normal;
            font-display: swap;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily,
          fontWeight: 'bold',
        },
        textInfo: {
          fontFamily,
          fontWeight: 'bold',
        },
      },
    },
  },
});

const globalStyles = createStyles(() => ({
  body: {
    backgroundColor: theme.palette.greyDark,
  },
}));

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <MThemeProvider theme={theme}>
    <CssBaseline>
      <GlobalStyles styles={globalStyles} />
      {children}
    </CssBaseline>
  </MThemeProvider>
);

export default ThemeProvider;
