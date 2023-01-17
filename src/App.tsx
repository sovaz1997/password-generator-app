import React, { FormEvent } from 'react';
import {
  Box,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import GeneratePasswordButton from './components/generate-password-button';
import { getPasswordStrength } from './utils/password';
import PasswordField from './components/password-field';
import PasswordStrengthIndicator from './components/password-strength-indicator';
import PasswordClipboardProvider from './providers/password-clipboard-provider';
import usePasswordGenerator from './hooks/use-password-generator';
import CharsetControl from './components/charset-control';
import PasswordLengthControl from './components/password-length-control';

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

const App = () => {
  const theme = useTheme();
  const passwordGenerator = usePasswordGenerator();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    passwordGenerator.generateNewPassword();
  };

  return (
    <PasswordClipboardProvider password={passwordGenerator.password}>
      <Wrapper>
        <PageWrapper>
          <Typography variant="h1" paddingTop={4} marginBottom={4}>
            Password generator
          </Typography>
          <Box marginBottom={3}>
            <PasswordField value={passwordGenerator.password} />
          </Box>
          <form onSubmit={handleSubmit}>
            <Box
              bgcolor={theme.palette.greyDark}
              paddingX={4}
              paddingY={3}
              gap={3}
              display="flex"
              flexDirection="column"
            >
              <PasswordLengthControl
                value={passwordGenerator.generationParams.length}
                onChange={(v) => passwordGenerator.updateParam('length', v)}
              />
              <CharsetControl
                value={passwordGenerator.generationParams.passwordCharsSets}
                onChange={(v) => passwordGenerator.updateParam('passwordCharsSets', v)}
              />
              <PasswordStrengthIndicator strength={getPasswordStrength(passwordGenerator.generationParams)} />
              <GeneratePasswordButton />
            </Box>
          </form>
        </PageWrapper>
      </Wrapper>
    </PasswordClipboardProvider>
  );
};

export default App;
