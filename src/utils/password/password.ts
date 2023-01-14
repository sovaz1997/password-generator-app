import { PasswordCharsSet } from '../../constants/password';

interface PasswordGenerationParams {
  length: number;
  passwordCharsSets: PasswordCharsSet[];
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

const getMergedCharsFromSets = (sets: PasswordCharsSet[]) => sets
  .map((charSet) => PASSWORD_CHARS[charSet])
  .join('');

export const getPossibleCharsInSet = (set: PasswordCharsSet): string[] => PASSWORD_CHARS[set].split('');

export const generatePassword = ({ length, passwordCharsSets }: PasswordGenerationParams): string => {
  if (passwordCharsSets.length === 0) {
    throw new Error('passwordCharsSet couldn\'t be empty');
  }

  const generatePasswordChar = () => {
    const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

    const availableChars = getMergedCharsFromSets(passwordCharsSets);

    return availableChars[
      randomBetween(0, availableChars.length)
    ];
  };

  return new Array(length)
    .fill(0)
    .map(generatePasswordChar)
    .join('');
};

export const testPasswordEntropy = ({ length, passwordCharsSets }: PasswordGenerationParams) => {
  const charsVariationsCount = getMergedCharsFromSets(passwordCharsSets).length;

  return Math.log2(charsVariationsCount) * length;
};

export const testPasswordStrength = ({ length, passwordCharsSets }: PasswordGenerationParams) => {
  // TODO: Implement
};
