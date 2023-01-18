import React, { FC } from 'react';
import {
  Box, Slider, styled, Typography, useTheme,
} from '@mui/material';

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

// TODO: Add new variants to typography (from Figma)

const PasswordLengthControl: FC<PasswordLengthControlProps> = ({
  value, onChange, min, max,
}) => {
  const theme = useTheme();
  const handleChange = (e: Event, length: number | number[]) => {
    if (!isNumber(length)) {
      throw new Error('Length must be a number');
    }

    onChange(length);
  };

  return (
    <Wrapper>
      <LengthViewer>
        <Typography fontSize={18}>Character Length</Typography>
        <Typography color={theme.palette.greenNeon} fontSize={24}>{value}</Typography>
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
