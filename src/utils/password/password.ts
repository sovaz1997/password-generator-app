import { PasswordStrength, PasswordSymbolsSet } from '../../constants/password';

interface PasswordGenerationParams {
  count: number;
  passwordSymbolsSet: PasswordSymbolsSet[];
}

export const getPossibleSymbolsInSet = (set: PasswordSymbolsSet): string[] => {
  // TODO: Implement
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
