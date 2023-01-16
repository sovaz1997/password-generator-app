import { Entries } from 'type-fest';
import { PasswordCharsSet, PasswordStrength } from '../../constants/password';

export interface PasswordGenerationParams {
  length: number;
  passwordCharsSets: PasswordCharsSet[];
}

type PasswordEntropyIntervals = Record<PasswordStrength, [number, number]>;

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

const PASSWORD_ENTROPY_INTERVALS: PasswordEntropyIntervals = {
  [PasswordStrength.TooWeak]: [0, 20],
  [PasswordStrength.Weak]: [20, 35],
  [PasswordStrength.Medium]: [35, 55],
  [PasswordStrength.Strong]: [55, Infinity],
};

const isNumberInInterval = (n: number, [a, b]: [number, number]) => n >= a && n < b;

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

export const getPasswordEntropy = ({ length, passwordCharsSets }: PasswordGenerationParams) => {
  const charsVariationsCount = getMergedCharsFromSets(passwordCharsSets).length;

  return Math.log2(charsVariationsCount) * length;
};

export const getPasswordStrengthFromEntropy = (entropy: number) => (Object
  .entries(PASSWORD_ENTROPY_INTERVALS) as Entries<PasswordEntropyIntervals>)
  .filter(([, [a, b]]) => isNumberInInterval(entropy, [a, b]))[0][0];
export const getPasswordStrength = (params: PasswordGenerationParams) => getPasswordStrengthFromEntropy(
  getPasswordEntropy(params),
);
