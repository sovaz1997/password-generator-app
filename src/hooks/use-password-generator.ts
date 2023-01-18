import { useCallback, useState } from 'react';
import { generatePassword, PasswordGenerationParams } from '@/utils/password';
import { PasswordCharsSet } from '@/constants/password';

const DEFAULT_GENERATION_PARAMS: PasswordGenerationParams = {
  passwordCharsSets: [
    PasswordCharsSet.Digits,
    PasswordCharsSet.LowercaseLetters,
  ],
  length: 10,
};

const usePasswordGenerator = () => {
  const [generationParams, setGenerationParams] = useState<PasswordGenerationParams>(DEFAULT_GENERATION_PARAMS);
  const [password, setPassword] = useState('');

  const generateNewPassword = useCallback(() => {
    setPassword(generatePassword(generationParams));
  }, [generationParams]);

  const updateParam = useCallback(<
    Key extends keyof PasswordGenerationParams,
    Value extends PasswordGenerationParams[Key],
  >(key: Key, value: Value) => {
    setGenerationParams((cur) => ({
      ...cur,
      [key]: value,
    }));
  }, []);

  return {
    generationParams,
    password,
    generateNewPassword,
    updateParam,
  };
};

export default usePasswordGenerator;
