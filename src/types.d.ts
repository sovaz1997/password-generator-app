import {
  PaletteOptions as MuiPaletteOptions,
} from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions extends MuiPaletteOptions {
    red: string;
    orange: string;
    yellow: string;
    greenNeon: string;
    white: string;
    greyDark: string;
    greyVeryDark: string;
  }

  interface Palette {
    red: string;
    orange: string;
    yellow: string;
    greenNeon: string;
    white: string;
    greyDark: string;
    greyVeryDark: string;
  }
}
