import { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { PasswordStrength } from '../../constants/password';
import RectIndicator from './rect-indicator';

interface StrengthInfo {
  text: string;
  color: string;
  enabledRectIndicatorsCount: 1 | 2 | 3 | 4;
}

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
}

const createIterations = ([a, b]: [number, number]) => {
  if (b < a) {
    throw new Error('a should be lower than b');
  }

  return new Array(b - a + 1).fill(null).map((v, i) => i + a);
};

const PasswordStrengthIndicator: FC<PasswordStrengthIndicatorProps> = ({ strength }) => {
  const theme = useTheme();
  const {
    palette: {
      greyVeryDark, greyDefault, red, greenNeon, yellow, orange,
    },
  } = theme;

  /* TODO:
      move enabledRectIndicatorsCount and color to other component
      and make rect indicator as full rect indicator (all 4 rects add here)
   */
  const strengthInfoList: Record<PasswordStrength, StrengthInfo> = {
    [PasswordStrength.TooWeak]: {
      text: 'Too Weak!',
      color: red,
      enabledRectIndicatorsCount: 1,
    },
    [PasswordStrength.Weak]: {
      text: 'Weak',
      color: orange,
      enabledRectIndicatorsCount: 2,
    },
    [PasswordStrength.Medium]: {
      text: 'Medium',
      color: yellow,
      enabledRectIndicatorsCount: 3,
    },
    [PasswordStrength.Strong]: {
      text: 'Strong',
      color: greenNeon,
      enabledRectIndicatorsCount: 4,
    },
  };

  const strengthInfo = strengthInfoList[strength];

  return (
    <Box
      bgcolor={greyVeryDark}
      paddingX={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography textTransform="uppercase" color={greyDefault}>Strength</Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <>
          <Typography textTransform="uppercase">
            {strengthInfo.text}
          </Typography>
          <Box display="flex" gap={1}>
            {
            createIterations([1, 4])
              .map((i) => (
                <RectIndicator
                  key={i}
                  color={strengthInfo.color}
                  enabled={strengthInfo.enabledRectIndicatorsCount >= i}
                />
              ))
            }
          </Box>
        </>
      </Box>
    </Box>
  );
};

export default PasswordStrengthIndicator;
