import { styled, SvgIcon } from '@mui/material';
import Button from './components/button/button';
import ThemeProvider from './providers/theme';
import IconArrowRight from './components/icons/icon-arrow-right';

const ButtonContent = styled('div')`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const App = () => (
  <ThemeProvider>
    <Button fullWidth>
      <ButtonContent>
        Generate
        <SvgIcon sx={{ transition: 'inherit' }} component={IconArrowRight} />
      </ButtonContent>
    </Button>
  </ThemeProvider>
);

export default App;
