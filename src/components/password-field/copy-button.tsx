import {
  FC, useEffect, useMemo, useState,
} from 'react';
import {
  alpha, Box, css, styled, Typography, useTheme,
} from '@mui/material';
import Icons from '../icons';
import usePasswordClipboardContext from '../../hooks/usePasswordClipboardContext';

// TODO: Divide

const SHOW_COPIED_TIME_MS = 3000;
const ANIMATION_TIME = '200ms';

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

const Wrapper = styled(Box)`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100px;
  z-index: 0;
`;

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

interface CopyButtonProps {
  onClick: () => void;
  disabled?: boolean;
  password: string;
  hovered: boolean;
}

// TODO: replace fill to "hovered" and do some changes (when we copy password, always show it as green) + add transition
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
      <CopiedText show={showCopiedText} color={fill} textTransform="uppercase">Copied</CopiedText>
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
