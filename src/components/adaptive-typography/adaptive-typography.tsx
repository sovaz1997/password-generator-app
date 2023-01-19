import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import {
  Box, styled, Typography, TypographyProps,
} from '@mui/material';

interface WrapperProps {
  show: boolean;
}

const Wrapper = styled(Box)<WrapperProps>`
  overflow-x: auto;
  opacity: ${(p) => (p.show ? 1 : 0)};
`;

interface AdaptiveTypographyProps extends Omit<TypographyProps, 'fontSize'> {
  fontSize: number;
}

const AdaptiveTypography: FC<AdaptiveTypographyProps> = ({ fontSize, children, ...rest }) => {
  const [currentFontSize, setCurrentFontSize] = React.useState(fontSize);
  const [showText, setShowText] = useState(false); // typographyScrollWidth === typographyWidth;

  React.useEffect(() => {
    const restoreFontSizeOnChildrenUpdate = () => {
      setCurrentFontSize(fontSize);
      setShowText(false);
    };
    restoreFontSizeOnChildrenUpdate();
  }, [fontSize, children]);

  const ref = useRef<HTMLSpanElement | null>(null);

  const checkTextSize = (newTypographyRef: HTMLSpanElement) => {
    ref.current = newTypographyRef;
    const typographyScrollWidth = newTypographyRef?.scrollWidth;
    const typographyWidth = newTypographyRef?.offsetWidth;

    const currentTextShowing = typographyScrollWidth === typographyWidth;

    if (!currentTextShowing) {
      setCurrentFontSize((current) => (current > 1 ? current - 1 : current));
    }

    setShowText(typographyScrollWidth === typographyWidth);
  };

  useEffect(() => {
    const resizeCheck = () => {
      setCurrentFontSize(fontSize);
      if (ref.current) {
        checkTextSize(ref.current);
      }
    };

    window.addEventListener('resize', resizeCheck);

    return () => window.removeEventListener('resize', resizeCheck);
  }, [fontSize]);

  return (
    <Wrapper show={showText}>
      <Typography {...rest} whiteSpace="nowrap" ref={checkTextSize} fontSize={currentFontSize}>
        {children}
      </Typography>
    </Wrapper>
  );
};

export default AdaptiveTypography;
