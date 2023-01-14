import React, { useState } from 'react';
import {
  Checkbox, FormControlLabel, FormGroup, Slider,
} from '@mui/material';
import GeneratePasswordButton from './components/generate-password-button';
import { generatePassword, getPasswordStrength, PasswordGenerationParams } from './utils/password';
import { PasswordCharsSet } from './constants/password';

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

const isNumber = (x: any): x is number => typeof x === 'number';

const PASSWORD_LENGTH_RANGE = { from: 4, to: 25 };

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
    <div>
      <h1>Password generator</h1>
      {password}
      <Slider
        value={generationParams.length}
        onChange={handleChangePasswordLength}
        step={1}
        min={PASSWORD_LENGTH_RANGE.from}
        max={PASSWORD_LENGTH_RANGE.to}
      />
      <FormGroup>
        { renderCharSetToggle(PasswordCharsSet.Digits) }
        { renderCharSetToggle(PasswordCharsSet.LowercaseLetters) }
        { renderCharSetToggle(PasswordCharsSet.UppercaseLetters) }
        { renderCharSetToggle(PasswordCharsSet.SpecialSymbols) }
      </FormGroup>
      {getPasswordStrength(generationParams)}
      <GeneratePasswordButton onClick={handleGeneratePassword} />
    </div>
  );
};

export default App;
