import React, { FC } from 'react';
import {
  Box, Slider, styled, Typography, useTheme,
} from '@mui/material';
import useScreenSize, { ScreenTypes } from '@/hooks/use-screen-size';

const isNumber = (x: any): x is number => typeof x === 'number';

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LengthViewer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface PasswordLengthControlProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number
}
const PasswordLengthControl: FC<PasswordLengthControlProps> = ({
  value, onChange, min, max,
}) => {
  const theme = useTheme();
  const screenSize = useScreenSize();
  const handleChange = (e: Event, length: number | number[]) => {
    if (!isNumber(length)) {
      throw new Error('Length must be a number');
    }

    onChange(length);
  };

  return (
    <Wrapper>
      <LengthViewer>
        <Typography
          variant={screenSize === ScreenTypes.MOBILE ? 'BodyM' : 'BodyL'}
        >
          Character Length
        </Typography>
        <Typography
          color={theme.palette.greenNeon}
          variant={screenSize === ScreenTypes.MOBILE ? 'HeadingM' : 'HeadingL'}
        >
          {value}
        </Typography>
      </LengthViewer>
      <Slider
        value={value}
        onChange={handleChange}
        step={1}
        min={min}
        max={max}
      />
    </Wrapper>
  );
};

export default PasswordLengthControl;
