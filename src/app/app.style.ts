import { Box, styled, Typography } from '@mui/material';
import { getColor } from '@/utils/styled';

const Wrapper = styled(Box)`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const PageWrapper = styled(Box)`
  width: 540px;
  max-width: 100%;
`;

const FormBox = styled(Box)`
  background-color: ${getColor('greyDark')};
  padding: 24px 32px;
  gap: 24px;
  display: flex;
  flex-direction: column;
`;

const Title = styled(Typography)`
  margin-bottom: 32px;
  text-align: center;
  padding-top: 133px;
  display: block;
  
  ${(p) => p.theme.breakpoints.down('md')} {
      padding-top: 64px;
  };
`;

export default {
  Wrapper,
  PageWrapper,
  FormBox,
  Title,
};
