import { Theme } from '@mui/material';

export type Color = keyof Theme['palette'];

const colorIsString = (x: any): x is string => typeof x === 'string';

export const getColor = (color: Color) => <T extends { theme: Theme }>({ theme }: T): string => {
  const colorValue = theme.palette[color];
  if (!colorIsString(colorValue)) {
    throw new Error('Color must be a string');
  }

  return colorValue;
};
