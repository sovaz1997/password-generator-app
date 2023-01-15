import { useTheme } from '@mui/material';
import { FC } from 'react';

interface CheckProps {
  checked: boolean
}

const Check: FC<CheckProps> = ({ checked }) => {
  const theme = useTheme();

  if (checked) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" fill={theme.palette.greenNeon} />
        <path d="M4 10.6066L7.39341 14L15.3934 6" stroke="#18171F" strokeWidth="3" />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="18" height="18" stroke={theme.palette.white} strokeWidth="2" />
    </svg>
  );
};

export default Check;
