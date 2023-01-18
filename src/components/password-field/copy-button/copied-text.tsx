import { css, styled, Typography } from '@mui/material';
import { ANIMATION_TIME } from './constants';

interface CopiedTextProps {
  show: boolean;
}

const CopiedText = styled(Typography)<CopiedTextProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity ${ANIMATION_TIME} ease-out,
    left ${ANIMATION_TIME} cubic-bezier(0, 0, 0.65, 1.39),
    color ${ANIMATION_TIME} ease-out;
  z-index: -1;
  
  ${(p) => p.show && css`
    opacity: 1;
    left: 0;
  `};

  ${(p) => !p.show && css`
    opacity: 0;
    left: 40px;
  `};
`;

export default CopiedText;
