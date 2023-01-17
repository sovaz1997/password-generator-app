import React, { FC } from 'react';
import {
  Box, Slider, styled, Typography, useTheme,
} from '@mui/material';

const PASSWORD_LENGTH_RANGE = { from: 4, to: 30 };

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
}

// TODO: Add new variants to typography (from Figma)

const PasswordLengthControl: FC<PasswordLengthControlProps> = ({ value, onChange }) => {
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
        min={PASSWORD_LENGTH_RANGE.from}
        max={PASSWORD_LENGTH_RANGE.to}
      />
    </Wrapper>
  );
};

export default PasswordLengthControl;
