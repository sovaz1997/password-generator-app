import { PasswordCharsSet } from '../../constants/password';

interface PasswordGenerationParams {
  length: number;
  passwordCharsSet: PasswordCharsSet[];
}

export const getPossibleCharsInSet = (set: PasswordCharsSet): string[] => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const specialSymbols = '~`! @#$%^&*()_-+={[}]|\\:;"\'<,>.?/';

  const possibleCharsSplitBySet: Record<PasswordCharsSet, string> = {
    [PasswordCharsSet.Digits]: digits,
    [PasswordCharsSet.LowercaseAlphabet]: alphabet,
    [PasswordCharsSet.UppercaseAlphabet]: alphabet.toUpperCase(),
    [PasswordCharsSet.SpecialSymbols]: specialSymbols,
  };

  return possibleCharsSplitBySet[set].split('');
};

export const generatePassword = ({ length, passwordCharsSet }: PasswordGenerationParams): string => {
  // TODO: Implement
};

export const testPasswordEntropy = () => {
  // TODO: Implement
};

export const testPasswordStrength = () => {
  // TODO: Implement
};
