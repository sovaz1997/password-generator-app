import {
  Box, styled, Typography, useTheme, css,
} from '@mui/material';
import { FC, useRef } from 'react';
import { useCopyToClipboard, useHover } from 'usehooks-ts';
import Icons from '../icons';

const PLACEHOLDER_TEXT = 'P4$5W0rD!';
const PASSWORD_FONT_SIZE = 32;

interface PasswordFieldProps {
  value?: string;
}

interface PasswordContentProps {
  disabled: boolean
}

interface IconButtonProps {
  fill: string;
}

const IconButton = styled('button')<IconButtonProps>`
  background: transparent;
  border: none;
  outline: none;
  
  fill: ${(p) => p.fill};
  
  :enabled {
    cursor: pointer;

    &:hover, &:focus {
      fill: ${({ theme }) => theme.palette.greenNeon};
    }
  ;
  }
`;

const PasswordContent = styled(Box)<PasswordContentProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ${(p) => p.disabled && css`opacity: 0.25`}
`;

const PasswordField: FC<PasswordFieldProps> = ({ value }) => {
  const theme = useTheme();
  const [, copy] = useCopyToClipboard();
  const { palette: { white, greenNeon, greyDark } } = theme;

  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  const copyValue = () => {
    if (value) {
      copy(value);
    }
  };

  const renderPassword = () => (
    <Typography fontSize={PASSWORD_FONT_SIZE}>{ value || PLACEHOLDER_TEXT }</Typography>
  );

  const renderCopyIcon = () => {
    const getFill = () => {
      if (!value) {
        return white;
      }

      return isHover ? greenNeon : white;
    };

    return (
      <IconButton fill={getFill()} disabled={!value} onClick={copyValue}>
        <Icons.Copy />
      </IconButton>
    );
  };

  return (
    <Box
      onClick={copyValue}
      ref={hoverRef}
      bgcolor={greyDark}
      alignItems="center"
      display="flex"
      justifyContent="space-between"
      height={80}
      paddingX={4}
      sx={{
        cursor: value ? 'pointer' : 'default',
      }}
    >
      <PasswordContent disabled={!value}>
        { renderPassword() }
        { renderCopyIcon() }
      </PasswordContent>
    </Box>
  );
};

export default PasswordField;
