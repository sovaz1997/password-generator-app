import React, { FormEvent } from 'react';
import {
  Box,
  Checkbox, FormControlLabel, FormGroup, Slider, styled, Typography, useTheme,
} from '@mui/material';
import GeneratePasswordButton from './components/generate-password-button';
import { getPasswordStrength } from './utils/password';
import { PasswordCharsSet } from './constants/password';
import PasswordField from './components/password-field';
import PasswordStrengthIndicator from './components/password-strength-indicator';
import PasswordClipboardProvider from './providers/password-clipboard-provider';
import usePasswordGenerator from './hooks/use-password-generator';

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

const CharsetToggleFormGroup = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CHAR_SETS_LABEL_MAP: Record<PasswordCharsSet, string> = {
  [PasswordCharsSet.LowercaseLetters]: 'Include Lowercase Letters',
  [PasswordCharsSet.UppercaseLetters]: 'Include Uppercase Letters',
  [PasswordCharsSet.Digits]: 'Include Digits',
  [PasswordCharsSet.SpecialSymbols]: 'Include Special Symbols',
};

const PASSWORD_LENGTH_RANGE = { from: MIN_PASSWORD_LENGTH, to: MAX_PASSWORD_LENGTH };
const isNumber = (x: any): x is number => typeof x === 'number';

const App = () => {
  const passwordGenerator = usePasswordGenerator();

  const theme = useTheme();

  const handleChangeCharsSets = (set: PasswordCharsSet, enabled: boolean) => {
    passwordGenerator.setGenerationParams((cur) => {
      const { passwordCharsSets } = cur;

      const charsSet = new Set([...passwordCharsSets]);

      if (enabled) {
        charsSet.add(set);
      } else {
        charsSet.delete(set);
      }

      return {
        ...cur,
        passwordCharsSets: [...charsSet],
      };
    });
  };

  const handleChangePasswordLength = (e: Event, length: number | number[]) => {
    if (!isNumber(length)) {
      throw new Error('Length must be a number');
    }

    passwordGenerator.setGenerationParams((cur) => ({ ...cur, length }));
  };

  const renderCharSetToggle = (set: PasswordCharsSet) => {
    const isChecked = passwordGenerator.generationParams.passwordCharsSets.includes(set);

    return (
      <FormControlLabel
        control={(
          <Checkbox
            checked={isChecked}
            onChange={(e, checked) => handleChangeCharsSets(set, checked)}
            disabled={isChecked && passwordGenerator.generationParams.passwordCharsSets.length === 1}
          />
      )}
        label={CHAR_SETS_LABEL_MAP[set]}
      />
    );
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
              <CharsetToggleFormGroup>
                { renderCharSetToggle(PasswordCharsSet.Digits) }
                { renderCharSetToggle(PasswordCharsSet.LowercaseLetters) }
                { renderCharSetToggle(PasswordCharsSet.UppercaseLetters) }
                { renderCharSetToggle(PasswordCharsSet.SpecialSymbols) }
              </CharsetToggleFormGroup>
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
