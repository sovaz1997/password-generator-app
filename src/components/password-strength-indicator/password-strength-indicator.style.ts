import { Box, styled } from '@mui/material';
import { getColor } from '@/utils/styled';
import theme from '@/providers/theme';

const Wrapper = styled(Box)`
  background-color: ${getColor('greyVeryDark')};
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  
  ${(p) => p.theme.breakpoints.down('lg')} {
    height: 56px;
  }
`;
export default {
  Wrapper,
};
