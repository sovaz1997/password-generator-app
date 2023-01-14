import { generatePassword, getPossibleCharsInSet } from './password';
import { PasswordCharsSet } from '../../constants/password';

const specialSymbols = '~`! @#$%^&*()_-+={[}]|\\:;"\'<,>.?/';
const lowercasedAlphabet = 'abcdefghijklmnopqrstuvwxyz';
const digits = '0123456789';
const uppercasedAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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
      const possibleSymbols = getPossibleCharsInSet(PasswordCharsSet.Digits);
      expect(hasThisSymbols(digits, possibleSymbols)).toBeTruthy();
    });

    it('lowercase', () => {
      const possibleSymbols = getPossibleCharsInSet(PasswordCharsSet.LowercaseAlphabet);
      expect(hasThisSymbols(lowercasedAlphabet, possibleSymbols)).toBeTruthy();
    });

    it('Uppercase', () => {
      const possibleSymbols = getPossibleCharsInSet(PasswordCharsSet.UppercaseAlphabet);
      expect(hasThisSymbols(uppercasedAlphabet.toUpperCase(), possibleSymbols)).toBeTruthy();
    });

    it('Special symbols', () => {
      const possibleSpecialSymbols = getPossibleCharsInSet(PasswordCharsSet.SpecialSymbols);
      expect(hasThisSymbols(specialSymbols, possibleSpecialSymbols)).toBeTruthy();
    });
  });

  describe('generatePassword', () => {
    const ITERATIONS = 1000;
    const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
    const randomStandardPasswordLength = () => randomBetween(4, 30);
    const passwordDontHaveCharsFromSets = (password: string, sets: string[]): boolean => {
      const chars = sets.join('');
      return password
        .split('')
        .every((passwordChar) => !chars.includes(passwordChar));
    };

    it('Password length', () => {
      for (let passwordLength = 4; passwordLength <= 30; passwordLength += 1) {
        const testPassword = generatePassword({
          length: passwordLength,
          passwordCharsSet: [
            PasswordCharsSet.Digits,
          ],
        });

        expect(testPassword).toHaveLength(passwordLength);
      }
    });

    it('Simple password that have only digits', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.Digits,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          lowercasedAlphabet,
          uppercasedAlphabet,
          specialSymbols,
        ])).toBeTruthy();
      }
    });

    it('Simple password that have only lower-cased alphabet chars', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.LowercaseAlphabet,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          uppercasedAlphabet,
          digits,
          specialSymbols,
        ])).toBeTruthy();
      }
    });

    it('Simple password that have only upper-cased alphabet chars', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.UppercaseAlphabet,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          lowercasedAlphabet,
          digits,
          specialSymbols,
        ])).toBeTruthy();
      }
    });

    it('Simple password that have only special symbols', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.SpecialSymbols,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          lowercasedAlphabet,
          digits,
          uppercasedAlphabet,
        ])).toBeTruthy();
      }
    });
  });
});
