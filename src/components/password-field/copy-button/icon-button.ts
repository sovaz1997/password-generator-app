import { alpha, styled } from '@mui/material';
import { ANIMATION_TIME } from './constants';

interface IconButtonProps {
  fill: string;
}

const IconButton = styled('button')<IconButtonProps>`
  background: transparent;
  width: 33px;
  height: 33px;
  border-radius: 50%;
  border: none;
  outline: none;
  
  fill: ${(p) => p.fill};
  
  transition: fill ${ANIMATION_TIME} ease-out;
  
  :enabled {
    cursor: pointer;

    &:hover, &:focus {
      fill: ${({ theme }) => theme.palette.greenNeon};
    }
    &:focus-within {
      // eslint-disable-next-line max-len
      transition: box-shadow 150ms
      cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      box-shadow: ${(p) => `0 0 0 8px ${alpha(p.theme.palette.greenNeon, 0.16)} !important`};
      background: ${(p) => alpha(p.theme.palette.greenNeon, 0.16)};
    }
  }
`;

export default IconButton;
