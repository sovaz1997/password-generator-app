import { FC, PropsWithChildren } from 'react';
import {
  ThemeProvider as MThemeProvider,
  createTheme,
  CssBaseline,
  GlobalStyles,
  createStyles, css, alpha,
} from '@mui/material';
import JetBrainsMonoBoldWoff from '../assets/fonts/JetBrainsMono-Bold.woff';
import JetBrainsMonoBoldWoff2 from '../assets/fonts/JetBrainsMono-Bold.woff2';
import Icons from '../components/icons';

const FONT_FAMILY = [
  '"JetBrains Mono"',
  'Roboto',
  '"Helvetica Neue"',
  'sans-serif',
].join(',');

const COLORS = {
  WHITE: '#E6E5EA',
  GREEN_NEON: '#A4FFAF',
  GREY_VERY_DARK: '#18171F',
  GREY_DARK: '#24232C',
  GREY_DEFAULT: '#817D92',
};

const DISABLED_OPACITY = 0.5;

const theme = createTheme({
  palette: {
    red: '#F64A4A',
    orange: '#FB7C58',
    yellow: '#F8CD65',
    greenNeon: COLORS.GREEN_NEON,
    white: COLORS.WHITE,
    greyDark: COLORS.GREY_DARK,
    greyVeryDark: COLORS.GREY_VERY_DARK,
    greyDefault: COLORS.GREY_DEFAULT,
  },
  typography: {
    fontFamily: FONT_FAMILY,
    body1: {
      color: COLORS.WHITE,
    },
    h1: {
      fontSize: '32px',
      lineHeight: '43px',
      textAlign: 'center',
      color: COLORS.GREY_DEFAULT,
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
    MuiSlider: {
      styleOverrides: {
        root: {
          color: COLORS.GREEN_NEON,
          borderRadius: 0,
          height: '8px',

          '.MuiSlider-thumb:hover, .Mui-active, .Mui-focusVisible': {
            boxShadow: `0 0 0 8px ${alpha(COLORS.GREEN_NEON, 0.16)} !important`,
          },
        },
        thumbColorPrimary: '#000000',
        thumbColorSecondary: '#000000',
        thumb: {
          color: COLORS.WHITE,
          width: '28px',
          height: '28px',
        },
        rail: {
          color: COLORS.GREY_VERY_DARK,
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        icon: <Icons.Check checked={false} />,
        checkedIcon: <Icons.Check checked />,
      },
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          marginRight: 24,
          color: 'transparent !important',

          '&.Mui-disabled': {
            opacity: DISABLED_OPACITY,
          },

          '&.Mui-focusVisible': {
            backgroundColor: 'transparent',
            // eslint-disable-next-line max-len
            transition: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            boxShadow: `0 0 0 8px ${alpha(COLORS.GREEN_NEON, 0.16)} !important`,
            outline: 'none',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: 0,
        },
        label: {
          fontSize: 18,
          lineHeight: '18px',
          '&.Mui-disabled': {
            color: COLORS.WHITE,
            opacity: DISABLED_OPACITY,
          },
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
