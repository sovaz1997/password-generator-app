import { styled, SvgIcon } from '@mui/material';
import { FC } from 'react';
import Button from '../button/button';
import Icons from '../icons';

const ButtonContent = styled('div')`
  display: flex;
  align-items: center;
  gap: 24px;
`;

interface GeneratePasswordButtonProps {
  onClick?: () => unknown;
}

const GeneratePasswordButton: FC<GeneratePasswordButtonProps> = ({ onClick }) => (
  <Button fullWidth onClick={onClick}>
    <ButtonContent>
      Generate
      <SvgIcon sx={{ transition: 'inherit' }} component={Icons.IconArrowRight} />
    </ButtonContent>
  </Button>
);

export default GeneratePasswordButton;
