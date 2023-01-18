import { FC, useRef } from 'react';
import {
  Box, styled, useTheme, css,
} from '@mui/material';
import { useHover } from 'usehooks-ts';
import { useHotkeys } from 'react-hotkeys-hook';
import { HotkeysScopes } from '@/constants/hotkeys';
import AdaptiveTypography from '@/components/adaptive-typography';
import usePasswordClipboardContext from '@/hooks/use-password-clipboard-context';
import CopyButton from './copy-button';

const PLACEHOLDER_TEXT = 'P4$5W0rD!';
const PASSWORD_FONT_SIZE = 32;

interface PasswordFieldProps {
  value: string;
}

interface PasswordContentProps {
  disabled: boolean
}

const PasswordContent = styled(Box)<PasswordContentProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;

  ${(p) => p.disabled && css`opacity: 0.25`}
`;

const PasswordField: FC<PasswordFieldProps> = ({ value }) => {
  const theme = useTheme();

  const passwordClipboard = usePasswordClipboardContext();

  const { palette: { greyDark } } = theme;

  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  useHotkeys('ctrl+c', passwordClipboard.copy, { scopes: [HotkeysScopes.MAIN], enableOnFormTags: true }, [value]);

  const renderPassword = () => (
    <AdaptiveTypography fontSize={PASSWORD_FONT_SIZE}>{ value || PLACEHOLDER_TEXT }</AdaptiveTypography>
  );

  const renderCopyIcon = () => (
    <CopyButton
      hovered={isHover}
      disabled={!value}
      onClick={passwordClipboard.copy}
      password={value}
    />
  );

  return (
    <Box
      onClick={passwordClipboard.copy}
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
