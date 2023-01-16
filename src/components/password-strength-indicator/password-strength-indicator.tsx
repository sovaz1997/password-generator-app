import { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { PasswordStrength } from '../../constants/password';
import RectIndicator from './rect-indicator';

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
}

const PasswordStrengthIndicator: FC<PasswordStrengthIndicatorProps> = ({ strength }) => {
  const theme = useTheme();
  const {
    palette: {
      greyVeryDark, greyDefault,
    },
  } = theme;

  const strengthLabels: Record<PasswordStrength, string> = {
    [PasswordStrength.TooWeak]: 'Too Weak!',
    [PasswordStrength.Weak]: 'Weak',
    [PasswordStrength.Medium]: 'Medium',
    [PasswordStrength.Strong]: 'Strong',
  };

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
            {strengthLabels[strength]}
          </Typography>
          <RectIndicator strength={strength} />
        </>
      </Box>
    </Box>
  );
};

export default PasswordStrengthIndicator;
