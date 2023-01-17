import React, { FormEvent } from 'react';
import { Box } from '@mui/material';
import GeneratePasswordButton from '../components/generate-password-button';
import { getPasswordStrength } from '../utils/password';
import PasswordField from '../components/password-field';
import PasswordStrengthIndicator from '../components/password-strength-indicator';
import PasswordClipboardProvider from '../providers/password-clipboard-provider';
import usePasswordGenerator from '../hooks/use-password-generator';
import CharsetControl from '../components/charset-control';
import PasswordLengthControl from '../components/password-length-control';
import S from './app.style';

const App = () => {
  const passwordGenerator = usePasswordGenerator();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    passwordGenerator.generateNewPassword();
  };

  return (
    <PasswordClipboardProvider password={passwordGenerator.password}>
      <S.Wrapper>
        <S.PageWrapper>
          <S.Title variant="h1">
            Password generator
          </S.Title>
          <PasswordField value={passwordGenerator.password} />
          <Box height={24} />
          <form onSubmit={handleSubmit}>
            <S.FormBox>
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
            </S.FormBox>
          </form>
        </S.PageWrapper>
      </S.Wrapper>
    </PasswordClipboardProvider>
  );
};

export default App;
