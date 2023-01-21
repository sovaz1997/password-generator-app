import { Box, styled } from '@mui/material';
import { getColor } from '@/utils/styled';

interface PasswordContentProps {
  disabled: boolean
}

const PasswordContent = styled(Box)<PasswordContentProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
  opacity: ${(p) => (p.disabled ? 0.25 : 1)};
`;

interface WrapperProps {
  cursorPointer?: boolean;
}

const Wrapper = styled(Box)<WrapperProps>`
  background-color: ${getColor('greyDark')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  cursor: ${(p) => (p.cursorPointer ? 'pointer' : 'default')};
  height: 80px;

  ${(p) => p.theme.breakpoints.down('md')} {
    height: 64px;
    padding: 0 16px;
  };
`;

export default {
  PasswordContent,
  Wrapper,
};
