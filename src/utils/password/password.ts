import { PasswordCharsSet } from '../../constants/password';

interface PasswordGenerationParams {
  length: number;
  passwordCharsSet: PasswordCharsSet[];
}

const SPECIAL_SYMBOLS = '~`! @#$%^&*()_-+={[}]|\\:;"\'<,>.?/';
const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const UPPERCASE_LETTERS = LOWERCASE_LETTERS.toUpperCase();

const PASSWORD_CHARS: Record<PasswordCharsSet, string> = {
  [PasswordCharsSet.Digits]: DIGITS,
  [PasswordCharsSet.LowercaseLetters]: LOWERCASE_LETTERS,
  [PasswordCharsSet.UppercaseLetters]: UPPERCASE_LETTERS,
  [PasswordCharsSet.SpecialSymbols]: SPECIAL_SYMBOLS,
};

export const getPossibleCharsInSet = (set: PasswordCharsSet): string[] => PASSWORD_CHARS[set].split('');

export const generatePassword = ({ length, passwordCharsSet }: PasswordGenerationParams): string => {
  if (passwordCharsSet.length === 0) {
    throw new Error('passwordCharsSet couldn\'t be empty');
  }

  const generatePasswordChar = () => {
    const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

    const allCharsThatCouldBeInPassword = passwordCharsSet
      .map((charSet) => PASSWORD_CHARS[charSet])
      .join('');

    return allCharsThatCouldBeInPassword[
      randomBetween(0, allCharsThatCouldBeInPassword.length)
    ];
  };

  return new Array(length)
    .fill(0)
    .map(generatePasswordChar).join('');
};

export const testPasswordEntropy = ({ length, passwordCharsSet }: PasswordGenerationParams) => {
  // TODO: Implement
};

export const testPasswordStrength = ({ length, passwordCharsSet }: PasswordGenerationParams) => {
  // TODO: Implement
};
