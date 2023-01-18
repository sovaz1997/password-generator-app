import { useCallback, useState } from 'react';
import { generatePassword, PasswordGenerationParams } from '@/utils/password';
import { PasswordCharsSet } from '@/constants/password';

const PASSWORD_LENGTH_RANGE = {
  from: 4,
  to: 30,
};

const DEFAULT_GENERATION_PARAMS: PasswordGenerationParams = {
  passwordCharsSets: [
    PasswordCharsSet.Digits,
    PasswordCharsSet.LowercaseLetters,
  ],
  length: 10,
};

const isValidPasswordGenerationParams = (params: PasswordGenerationParams) => {
  if (params.length < PASSWORD_LENGTH_RANGE.from || params.length > PASSWORD_LENGTH_RANGE.to) {
    return false;
  }

  return params.passwordCharsSets.length >= 1;
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
    ValueFn extends ((value: PasswordGenerationParams) => Value),
  >(key: Key, value: Value | ValueFn) => {
    const res = typeof value === 'function' ? value(generationParams) : value;

    setGenerationParams((cur) => {
      const newParams = {
        ...cur,
        [key]: typeof value === 'function' ? value(generationParams) : value,
      };

      return isValidPasswordGenerationParams(newParams) ? newParams : cur;
    });
  }, [generationParams]);

  return {
    generationParams,
    password,
    generateNewPassword,
    updateParam,
    lengthRange: PASSWORD_LENGTH_RANGE,
  };
};

export default usePasswordGenerator;
