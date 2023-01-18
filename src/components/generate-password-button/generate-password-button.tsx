import { styled } from '@mui/material';
import { FC } from 'react';
import Button from '@/components/button/button';
import Icons from '@/components/icons';

const ButtonContent = styled('div')`
  display: flex;
  align-items: center;
  gap: 24px;
`;

interface GeneratePasswordButtonProps {
  onClick?: () => unknown;
}

const GeneratePasswordButton: FC<GeneratePasswordButtonProps> = ({ onClick }) => (
  <Button fullWidth onClick={onClick} type="submit">
    <ButtonContent>
      Generate
      <Icons.ArrowRight />
    </ButtonContent>
  </Button>
);

export default GeneratePasswordButton;
