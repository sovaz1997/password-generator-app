import { styled, Typography } from '@mui/material';
import { FC } from 'react';
import Button from '@/components/button/button';
import Icons from '@/components/icons';
import useScreenSize, { ScreenTypes } from '@/hooks/use-screen-size';

const ButtonContent = styled('div')`
  display: flex;
  align-items: center;
  gap: 24px;
`;

interface GeneratePasswordButtonProps {
  onClick?: () => unknown;
}

const GeneratePasswordButton: FC<GeneratePasswordButtonProps> = ({ onClick }) => {
  const screenSize = useScreenSize();

  return (
    <Button fullWidth onClick={onClick} type="submit">
      <ButtonContent>
        <Typography variant={screenSize === ScreenTypes.MOBILE ? 'BodyM' : 'BodyL'}>
          Generate
        </Typography>
        <Icons.ArrowRight />
      </ButtonContent>
    </Button>
  );
};

export default GeneratePasswordButton;
