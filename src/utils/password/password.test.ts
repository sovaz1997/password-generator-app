import { getPossibleSymbolsInSet } from './password';
import { PasswordSymbolsSet } from '../../constants/password';

describe('Password tests', () => {
  describe('getPossibleSymbolsInSet', () => {
    const hasThisSymbols = (symbols: string, test: string[]): boolean => {
      if (symbols.length !== test.length) {
        return false;
      }
      const hasSymbol = (symbol: string) => test.find((v) => v === symbol);

      return symbols.split('').every((symbol) => hasSymbol(symbol));
    };

    it('numbers', () => {
      const possibleSymbols = getPossibleSymbolsInSet(PasswordSymbolsSet.Numbers);
      expect(hasThisSymbols('0123456789', possibleSymbols)).toBeTruthy();
    });

    it('lowercase', () => {
      const possibleSymbols = getPossibleSymbolsInSet(PasswordSymbolsSet.Lowercase);
      expect(hasThisSymbols('abcdefghijklmnopqrstuvwxyz', possibleSymbols)).toBeTruthy();
    });

    it('Uppercase', () => {
      const possibleSymbols = getPossibleSymbolsInSet(PasswordSymbolsSet.Uppercase);
      expect(hasThisSymbols('ABCDEFGHIJKLMNOPQRSTUVWXYZ', possibleSymbols)).toBeTruthy();
    });

    it('Symbols', () => {
      const possibleSymbols = getPossibleSymbolsInSet(PasswordSymbolsSet.Symbols);
      expect(hasThisSymbols('~`! @#$%^&*()_-+={[}]|\\:;"\'<,>.?/', possibleSymbols)).toBeTruthy();
    });
  });
});
