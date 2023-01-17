import React, { FormEvent } from 'react';
import {
  Box,
  Slider, styled, Typography, useTheme,
} from '@mui/material';
import GeneratePasswordButton from './components/generate-password-button';
import { getPasswordStrength } from './utils/password';
import PasswordField from './components/password-field';
import PasswordStrengthIndicator from './components/password-strength-indicator';
import PasswordClipboardProvider from './providers/password-clipboard-provider';
import usePasswordGenerator from './hooks/use-password-generator';
import CharsetSelector from './components/charset-selector';

const MIN_PASSWORD_LENGTH = 4;
const MAX_PASSWORD_LENGTH = 30;

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

const PASSWORD_LENGTH_RANGE = { from: MIN_PASSWORD_LENGTH, to: MAX_PASSWORD_LENGTH };
const isNumber = (x: any): x is number => typeof x === 'number';

const App = () => {
  const theme = useTheme();
  const passwordGenerator = usePasswordGenerator();

  const handleChangePasswordLength = (e: Event, length: number | number[]) => {
    if (!isNumber(length)) {
      throw new Error('Length must be a number');
    }

    passwordGenerator.updateParam('length', length);
  };

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
              <Slider
                value={passwordGenerator.generationParams.length}
                onChange={handleChangePasswordLength}
                step={1}
                min={PASSWORD_LENGTH_RANGE.from}
                max={PASSWORD_LENGTH_RANGE.to}
              />
              <CharsetSelector
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
