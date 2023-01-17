import { useState } from 'react';
import { generatePassword, PasswordGenerationParams } from '../utils/password';
import { PasswordCharsSet } from '../constants/password';

const DEFAULT_GENERATION_PARAMS: PasswordGenerationParams = {
  passwordCharsSets: [
    PasswordCharsSet.Digits,
    PasswordCharsSet.LowercaseLetters,
  ],
  length: 10,
};

const usePasswordGenerator = () => {
  const [generationParams, setGenerationParams] = useState(DEFAULT_GENERATION_PARAMS);
  const [password, setPassword] = useState('');

  const generateNewPassword = () => {
    setPassword(generatePassword(generationParams));
  };

  return {
    generationParams,
    password,
    generateNewPassword,
    setGenerationParams,
  };
};

export default usePasswordGenerator;
