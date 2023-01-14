import { generatePassword, getPossibleCharsInSet } from './password';
import { PasswordCharsSet } from '../../constants/password';

const specialSymbols = '~`! @#$%^&*()_-+={[}]|\\:;"\'<,>.?/';
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const digits = '0123456789';
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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
      const possibleSymbols = getPossibleCharsInSet(PasswordCharsSet.LowercaseLetters);
      expect(hasThisSymbols(lowercaseLetters, possibleSymbols)).toBeTruthy();
    });

    it('Uppercase', () => {
      const possibleSymbols = getPossibleCharsInSet(PasswordCharsSet.UppercaseLetters);
      expect(hasThisSymbols(uppercaseLetters.toUpperCase(), possibleSymbols)).toBeTruthy();
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
          lowercaseLetters,
          uppercaseLetters,
          specialSymbols,
        ])).toBeTruthy();
      }
    });

    it('Simple password that have only lower-case letters', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.LowercaseLetters,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          uppercaseLetters,
          digits,
          specialSymbols,
        ])).toBeTruthy();
      }
    });

    it('Simple password that have only upper-case letters', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.UppercaseLetters,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          lowercaseLetters,
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
          lowercaseLetters,
          digits,
          uppercaseLetters,
        ])).toBeTruthy();
      }
    });

    it('Password that have digits and lower-case letters', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.Digits,
            PasswordCharsSet.LowercaseLetters,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          specialSymbols,
          uppercaseLetters,
        ])).toBeTruthy();
      }
    });

    it('Password that have digits and upper-case letters', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.Digits,
            PasswordCharsSet.UppercaseLetters,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          specialSymbols,
          lowercaseLetters,
        ])).toBeTruthy();
      }
    });

    it('Password that have digits and special symbols', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.Digits,
            PasswordCharsSet.SpecialSymbols,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          uppercaseLetters,
          lowercaseLetters,
        ])).toBeTruthy();
      }
    });

    it('Password that have lower-case and upper-case letters', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.LowercaseLetters,
            PasswordCharsSet.UppercaseLetters,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          digits,
          specialSymbols,
        ])).toBeTruthy();
      }
    });

    it('Password that have lower-case letters and special symbols', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.LowercaseLetters,
            PasswordCharsSet.SpecialSymbols,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          digits,
          uppercaseLetters,
        ])).toBeTruthy();
      }
    });

    it('Difficult password that have everything except digits', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.LowercaseLetters,
            PasswordCharsSet.UppercaseLetters,
            PasswordCharsSet.SpecialSymbols,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          digits,
        ])).toBeTruthy();
      }
    });

    it('Difficult password that have everything except lower-case letters', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.Digits,
            PasswordCharsSet.UppercaseLetters,
            PasswordCharsSet.SpecialSymbols,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          lowercaseLetters,
        ])).toBeTruthy();
      }
    });

    it('Difficult password that have everything except upper-case letters', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.Digits,
            PasswordCharsSet.LowercaseLetters,
            PasswordCharsSet.SpecialSymbols,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          uppercaseLetters,
        ])).toBeTruthy();
      }
    });

    it('Difficult password that have everything except special symbols', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSet: [
            PasswordCharsSet.Digits,
            PasswordCharsSet.LowercaseLetters,
            PasswordCharsSet.UppercaseLetters,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          specialSymbols,
        ])).toBeTruthy();
      }
    });

    it('Trying to generate password without any PasswordCharsSet should be impossible', () => {
      expect(generatePassword(
        { length: 10, passwordCharsSet: [] },
      )).toThrowError('passwordCharsSet couldn\'t be empty');
    });
  });
});
