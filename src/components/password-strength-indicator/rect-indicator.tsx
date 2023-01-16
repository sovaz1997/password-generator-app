import { Box, styled } from '@mui/material';
import { getColor } from '../../utils/styled';

interface RectIndicatorProps {
  color: string;
  enabled: boolean;
}

const RectIndicator = styled(Box)<RectIndicatorProps>`
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

export default RectIndicator;
