import {
  FC, useEffect, useMemo, useState,
} from 'react';
import {
  Box, styled, useTheme,
} from '@mui/material';
import usePasswordClipboardContext from '@/hooks/use-password-clipboard-context';
import Icons from '@/components/icons';
import { SHOW_COPIED_TIME_MS } from './constants';
import CopiedText from './copied-text';
import IconButton from './icon-button';

const Wrapper = styled(Box)`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 115px;
  z-index: 0;
`;

interface CopyButtonProps {
  onClick: () => void;
  disabled?: boolean;
  password: string;
  hovered: boolean;
}

const CopyButton: FC<CopyButtonProps> = ({
  onClick, disabled = false, password, hovered,
}) => {
  const theme = useTheme();
  const { palette: { white, greenNeon } } = theme;
  const { lastClipboardUsage } = usePasswordClipboardContext();

  const [showCopiedText, setShowCopiedText] = useState(false);

  const fill = useMemo(() => {
    if (showCopiedText) {
      return greenNeon;
    }

    if (!password) {
      return white;
    }

    return hovered ? greenNeon : white;
  }, [greenNeon, hovered, password, showCopiedText, white]);

  useEffect(() => {
    let timeoutId = 0;

    const showCopiedTextForSomeTimeWhenClipboardUsed = () => {
      setShowCopiedText(false);
      if (lastClipboardUsage) {
        setShowCopiedText(true);

        timeoutId = window.setTimeout(() => {
          setShowCopiedText(false);
        }, SHOW_COPIED_TIME_MS);
      }

      return () => clearTimeout(timeoutId);
    };

    return showCopiedTextForSomeTimeWhenClipboardUsed();
  }, [lastClipboardUsage]);

  useEffect(() => {
    const resetShowingCopiedOnPasswordUpdate = () => {
      setShowCopiedText(false);
    };

    resetShowingCopiedOnPasswordUpdate();
  }, [password]);

  return (
    <Wrapper>
      <CopiedText show={showCopiedText} color={fill} textTransform="uppercase" variant="BodyL">Copied</CopiedText>
      <IconButton
        onMouseDown={(e) => e.preventDefault()}
        fill={fill}
        disabled={disabled}
        onClick={onClick}
      >
        <Icons.Copy />
      </IconButton>
    </Wrapper>
  );
};

export default CopyButton;
