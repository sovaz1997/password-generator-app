import React, { useState } from 'react';
import {
  Box,
  Checkbox, FormControlLabel, FormGroup, Slider, styled, Typography,
} from '@mui/material';
import GeneratePasswordButton from './components/generate-password-button';
import { generatePassword, getPasswordStrength, PasswordGenerationParams } from './utils/password';
import { PasswordCharsSet } from './constants/password';
import PasswordField from './components/password-field';

// TODO: Divide by App and password generation page

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

const DEFAULT_GENERATION_PARAMS: PasswordGenerationParams = {
  passwordCharsSets: [
    PasswordCharsSet.Digits,
    PasswordCharsSet.LowercaseLetters,
  ],
  length: 10,
};

const PASSWORD_LENGTH_RANGE = { from: 4, to: 25 };
const isNumber = (x: any): x is number => typeof x === 'number';

const App = () => {
  const [password, setPassword] = useState('');
  const [generationParams, setGenerationParams] = useState(DEFAULT_GENERATION_PARAMS);

  const handleGeneratePassword = () => {
    setPassword(generatePassword(generationParams));
  };

  const handleChangeCharsSets = (set: PasswordCharsSet, enabled: boolean) => {
    setGenerationParams((cur) => {
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

    setGenerationParams((cur) => ({ ...cur, length }));
  };

  const renderCharSetToggle = (set: PasswordCharsSet) => {
    const isChecked = generationParams.passwordCharsSets.includes(set);

    return (
      <FormControlLabel
        control={(
          <Checkbox
            checked={isChecked}
            onChange={(e, checked) => handleChangeCharsSets(set, checked)}
            disabled={isChecked && generationParams.passwordCharsSets.length === 1}
          />
      )}
        label={CHAR_SETS_LABEL_MAP[set]}
      />
    );
  };

  return (
    <Wrapper>
      <PageWrapper>
        <Typography variant="h1" fontSize={16} paddingY={4}>Password generator</Typography>
        <PasswordField value={password} />
        <Slider
          value={generationParams.length}
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
        {getPasswordStrength(generationParams)}
        <GeneratePasswordButton onClick={handleGeneratePassword} />
      </PageWrapper>
    </Wrapper>
  );
};

export default App;
