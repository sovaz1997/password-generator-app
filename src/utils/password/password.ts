import { PasswordStrength, PasswordSymbolsSet } from '../../constants/password';

interface PasswordGenerationParams {
  count: number;
  passwordSymbolsSet: PasswordSymbolsSet[];
}

export const getPossibleSymbolsInSet = (set: PasswordSymbolsSet): string[] => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const symbols = '~`! @#$%^&*()_-+={[}]|\\:;"\'<,>.?/';

  const possibleSymbolsSplittedBySet: Record<PasswordSymbolsSet, string> = {
    [PasswordSymbolsSet.Numbers]: digits,
    [PasswordSymbolsSet.Lowercase]: alphabet,
    [PasswordSymbolsSet.Uppercase]: alphabet.toUpperCase(),
    [PasswordSymbolsSet.Symbols]: symbols,
  };

  return possibleSymbolsSplittedBySet[set].split('');
};

export const generatePassword = ({ count, passwordSymbolsSet }: PasswordGenerationParams) => {
  // TODO: Implement
};

export const testPasswordEntropy = () => {
  // TODO: Implement
};

export const testPasswordStrength = () => {
  // TODO: Implement
};
