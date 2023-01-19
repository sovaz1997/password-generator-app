import { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { PasswordStrength } from '@/constants/password';
import RectIndicator from './rect-indicator';
import S from './password-strength-indicator.style';

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
}

const PasswordStrengthIndicator: FC<PasswordStrengthIndicatorProps> = ({ strength }) => {
  const theme = useTheme();
  const {
    palette: {
      greyDefault,
    },
  } = theme;

  const strengthLabels: Record<PasswordStrength, string> = {
    [PasswordStrength.TooWeak]: 'Too Weak!',
    [PasswordStrength.Weak]: 'Weak',
    [PasswordStrength.Medium]: 'Medium',
    [PasswordStrength.Strong]: 'Strong',
  };

  return (
    <S.Wrapper>
      <Typography textTransform="uppercase" color={greyDefault}>Strength</Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <>
          <Typography textTransform="uppercase">
            {strengthLabels[strength]}
          </Typography>
          <RectIndicator strength={strength} />
        </>
      </Box>
    </S.Wrapper>
  );
};

export default PasswordStrengthIndicator;
