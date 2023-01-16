import { Box, styled, useTheme } from '@mui/material';
import { FC } from 'react';
import { PasswordStrength } from '../../constants/password';

interface RectProps {
  color: string;
  enabled: boolean;
}

const Rect = styled(Box)<RectProps>`
  box-sizing: border-box;
  width: 10px;
  height: 28px;
  position: relative;
  border: 2px solid ${({ theme, enabled, color }) => (enabled ? color : theme.palette.white)};
  
  &::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 28px;
    left: -2px;
    top: -2px;
    display: block;
    background-color: ${({ color }) => color};
    transform: scaleY(${({ enabled }) => (enabled ? '100%' : 0)});
    transform-origin: bottom center;
    transition: all 0.1s ease-out;
  };
`;

const createIterations = ([a, b]: [number, number]) => {
  if (b < a) {
    throw new Error('a should be lower than b');
  }

  return new Array(b - a + 1).fill(null).map((v, i) => i + a);
};

interface RectIndicatorProps {
  strength: PasswordStrength;
}

const RectIndicator: FC<RectIndicatorProps> = ({ strength }) => {
  const theme = useTheme();
  const {
    palette: {
      red, greenNeon, yellow, orange,
    },
  } = theme;

  const strengthToColor: Record<PasswordStrength, string> = {
    [PasswordStrength.TooWeak]: red,
    [PasswordStrength.Weak]: orange,
    [PasswordStrength.Medium]: yellow,
    [PasswordStrength.Strong]: greenNeon,
  };

  const strengthToDisplayedRects: Record<PasswordStrength, number> = {
    [PasswordStrength.TooWeak]: 1,
    [PasswordStrength.Weak]: 2,
    [PasswordStrength.Medium]: 3,
    [PasswordStrength.Strong]: 4,
  };

  return (
    <Box display="flex" gap={1}>
      <>
        {createIterations([1, 4])
          .map((i) => (
            <Rect
              key={i}
              color={strengthToColor[strength]}
              enabled={strengthToDisplayedRects[strength] >= i}
            />
          ))}
      </>
    </Box>
  );
};

export default RectIndicator;
