import React, { FC } from 'react';
import { Slider } from '@mui/material';

const PASSWORD_LENGTH_RANGE = { from: 4, to: 30 };

const isNumber = (x: any): x is number => typeof x === 'number';

interface PasswordLengthControlProps {
  value: number;
  onChange: (value: number) => void;
}

const PasswordLengthControl: FC<PasswordLengthControlProps> = ({ value, onChange }) => {
  const handleChange = (e: Event, length: number | number[]) => {
    if (!isNumber(length)) {
      throw new Error('Length must be a number');
    }

    onChange(length);
  };

  return (
    <Slider
      value={value}
      onChange={handleChange}
      step={1}
      min={PASSWORD_LENGTH_RANGE.from}
      max={PASSWORD_LENGTH_RANGE.to}
    />
  );
};

export default PasswordLengthControl;
