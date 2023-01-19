import {
  PaletteOptions as MuiPaletteOptions,
} from '@mui/material/styles/createPalette';
import { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariantsOptions {
    HeadingL?: CSSProperties;
    HeadingM?: CSSProperties;
    BodyL?: CSSProperties;
    BodyM?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    HeadingL: true;
    HeadingM: true;
    BodyL: true;
    BodyM: true;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions extends MuiPaletteOptions {
    red: string;
    orange: string;
    yellow: string;
    greenNeon: string;
    greyDefault: string;
    white: string;
    greyDark: string;
    greyVeryDark: string;
  }

  interface Palette {
    red: string;
    orange: string;
    yellow: string;
    greenNeon: string;
    greyDefault: string;
    white: string;
    greyDark: string;
    greyVeryDark: string;
  }
}
