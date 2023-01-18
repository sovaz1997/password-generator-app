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
`;

const FormBox = styled(Box)`
  background-color: ${getColor('greyDark')};
  padding: 24px 32px;
  gap: 24px;
  display: flex;
  flex-direction: column;
`;

const Title = styled(Typography)`
  padding-top: 32px;
  margin-bottom: 32px;
`;

export default {
  Wrapper,
  PageWrapper,
  FormBox,
  Title,
};
