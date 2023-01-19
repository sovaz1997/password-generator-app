import { useMediaQuery, useTheme } from '@mui/material';

export const enum ScreenTypes {
  MOBILE = 0,
  TABLET = 1,
  DESKTOP = 2,
}

const useScreenSize = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  if (isMobile) return ScreenTypes.MOBILE;
  if (isTablet) return ScreenTypes.TABLET;

  return ScreenTypes.DESKTOP;
};

export default useScreenSize;
