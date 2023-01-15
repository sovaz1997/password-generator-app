import { FC, PropsWithChildren } from 'react';
import {
  ThemeProvider as MThemeProvider,
  createTheme,
  CssBaseline,
  GlobalStyles,
  createStyles, css,
} from '@mui/material';
import JetBrainsMonoBoldWoff from '../assets/fonts/JetBrainsMono-Bold.woff';
import JetBrainsMonoBoldWoff2 from '../assets/fonts/JetBrainsMono-Bold.woff2';

const FONT_FAMILY = [
  '"JetBrains Mono"',
  'Roboto',
  '"Helvetica Neue"',
  'sans-serif',
].join(',');

const COLORS = {
  WHITE: '#E6E5EA',
};

const theme = createTheme({
  palette: {
    red: '#F64A4A',
    orange: '#FB7C58',
    yellow: '#F8CD65',
    greenNeon: '#A4FFAF',
    white: COLORS.WHITE,
    greyDark: '#24232C',
    greyVeryDark: '#18171F',
  },
  typography: {
    fontFamily: FONT_FAMILY,
    body1: {
      color: COLORS.WHITE,
    },
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
          fontFamily: FONT_FAMILY,
          fontWeight: 'bold',
        },
        textInfo: {
          fontFamily: FONT_FAMILY,
          fontWeight: 'bold',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1440,
      xl: 1600,
    },
  },
});

const style = css`
  body {
    background-Color: ${theme.palette.greyVeryDark};
    user-select: none;
  }
`;

const globalStyles = createStyles(() => style);

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <MThemeProvider theme={theme}>
    <CssBaseline>
      <GlobalStyles styles={globalStyles} />
      {children}
    </CssBaseline>
  </MThemeProvider>
);

export default ThemeProvider;
