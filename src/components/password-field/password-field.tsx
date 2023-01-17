import {
  Box, styled, Typography, useTheme, css, alpha,
} from '@mui/material';
import { FC, useCallback, useRef } from 'react';
import { useCopyToClipboard, useHover } from 'usehooks-ts';
import { useHotkeys } from 'react-hotkeys-hook';
import Icons from '../icons';
import { HotkeysScopes } from '../../constants/hotkeys';

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
  width: 33px;
  height: 33px;
  border-radius: 50%;
  border: none;
  outline: none;
  
  fill: ${(p) => p.fill};
  
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

const PasswordContent = styled(Box)<PasswordContentProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ${(p) => p.disabled && css`opacity: 0.25`}
`;

const PasswordField: FC<PasswordFieldProps> = ({ value }) => {
  const theme = useTheme();
  const [, copyToClipboard] = useCopyToClipboard();

  const { palette: { white, greenNeon, greyDark } } = theme;

  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  const copyValueToClipboard = useCallback(() => {
    if (value) {
      copyToClipboard(value);
    }
    // eslint-disable-next-line
  }, [value]);

  useHotkeys('ctrl+c', copyValueToClipboard, { scopes: [HotkeysScopes.MAIN] }, [copyValueToClipboard]);

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
      <IconButton onMouseDown={(e) => e.preventDefault()} fill={getFill()} disabled={!value} onClick={copyValueToClipboard}>
        <Icons.Copy />
      </IconButton>
    );
  };

  return (
    <Box
      onClick={copyValueToClipboard}
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
