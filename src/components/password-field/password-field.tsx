import { FC, useRef } from 'react';
import { useHover } from 'usehooks-ts';
import { useHotkeys } from 'react-hotkeys-hook';
import { HotkeysScopes } from '@/constants/hotkeys';
import AdaptiveTypography from '@/components/adaptive-typography';
import usePasswordClipboardContext from '@/hooks/use-password-clipboard-context';
import CopyButton from './copy-button';
import useScreenSize, { ScreenTypes } from '@/hooks/use-screen-size';
import S from './password-field.style';

const PLACEHOLDER_TEXT = 'P4$5W0rD!';
const PASSWORD_FONT_SIZE_MOBILE = 24;
const PASSWORD_FONT_SIZE = 32;

interface PasswordFieldProps {
  value: string;
}

const PasswordField: FC<PasswordFieldProps> = ({ value }) => {
  const passwordClipboard = usePasswordClipboardContext();

  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  useHotkeys('ctrl+c', passwordClipboard.copy, { scopes: [HotkeysScopes.MAIN], enableOnFormTags: true }, [value]);

  const screenSize = useScreenSize();

  const renderPassword = () => (
    <AdaptiveTypography fontSize={screenSize === ScreenTypes.MOBILE ? PASSWORD_FONT_SIZE_MOBILE : PASSWORD_FONT_SIZE}>
      { value || PLACEHOLDER_TEXT }
    </AdaptiveTypography>
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
    <S.Wrapper
      onClick={passwordClipboard.copy}
      ref={hoverRef}
      cursorPointer={!!value}
    >
      <S.PasswordContent disabled={!value}>
        { renderPassword() }
        { renderCopyIcon() }
      </S.PasswordContent>
    </S.Wrapper>
  );
};

export default PasswordField;
