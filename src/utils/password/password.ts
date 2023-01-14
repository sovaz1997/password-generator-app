import { PasswordCharsSet } from '../../constants/password';

interface PasswordGenerationParams {
  length: number;
  passwordCharsSet: PasswordCharsSet[];
}

const SPECIAL_SYMBOLS = '~`! @#$%^&*()_-+={[}]|\\:;"\'<,>.?/';
const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const UPPERCASE_LETTERS = LOWERCASE_LETTERS.toUpperCase();

export const getPossibleCharsInSet = (set: PasswordCharsSet): string[] => {
  const possibleCharsSplitBySet: Record<PasswordCharsSet, string> = {
    [PasswordCharsSet.Digits]: DIGITS,
    [PasswordCharsSet.LowercaseLetters]: LOWERCASE_LETTERS,
    [PasswordCharsSet.UppercaseLetters]: UPPERCASE_LETTERS,
    [PasswordCharsSet.SpecialSymbols]: SPECIAL_SYMBOLS,
  };

  return possibleCharsSplitBySet[set].split('');
};

export const generatePassword = ({ length, passwordCharsSet }: PasswordGenerationParams): string => {
  // const generatePasswordChar = () => {
  //   const possibleSymbols
  // }
};

export const testPasswordEntropy = () => {
  // TODO: Implement
};

export const testPasswordStrength = () => {
  // TODO: Implement
};
