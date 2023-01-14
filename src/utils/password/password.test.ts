import { generatePassword, getPossibleCharsInSet } from './password';
import { PasswordCharsSet } from '../../constants/password';

const SPECIAL_SYMBOLS = '~`! @#$%^&*()_-+={[}]|\\:;"\'<,>.?/';
const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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
      expect(hasThisSymbols(DIGITS, possibleSymbols)).toBeTruthy();
    });

    it('lowercase', () => {
      const possibleSymbols = getPossibleCharsInSet(PasswordCharsSet.LowercaseLetters);
      expect(hasThisSymbols(LOWERCASE_LETTERS, possibleSymbols)).toBeTruthy();
    });

    it('Uppercase', () => {
      const possibleSymbols = getPossibleCharsInSet(PasswordCharsSet.UppercaseLetters);
      expect(hasThisSymbols(UPPERCASE_LETTERS.toUpperCase(), possibleSymbols)).toBeTruthy();
    });

    it('Special symbols', () => {
      const possibleSpecialSymbols = getPossibleCharsInSet(PasswordCharsSet.SpecialSymbols);
      expect(hasThisSymbols(SPECIAL_SYMBOLS, possibleSpecialSymbols)).toBeTruthy();
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

    const passwordHaveCharsFromSets = (password: string, sets: string[]): boolean => {
      const chars = sets.join('');
      return password
        .split('')
        .every((passwordChar) => chars.includes(passwordChar));
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
          LOWERCASE_LETTERS,
          UPPERCASE_LETTERS,
          SPECIAL_SYMBOLS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          DIGITS,
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
          UPPERCASE_LETTERS,
          DIGITS,
          SPECIAL_SYMBOLS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          LOWERCASE_LETTERS,
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
          LOWERCASE_LETTERS,
          DIGITS,
          SPECIAL_SYMBOLS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          UPPERCASE_LETTERS,
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
          LOWERCASE_LETTERS,
          DIGITS,
          UPPERCASE_LETTERS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          SPECIAL_SYMBOLS,
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
          SPECIAL_SYMBOLS,
          UPPERCASE_LETTERS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          DIGITS,
          LOWERCASE_LETTERS,
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
          SPECIAL_SYMBOLS,
          LOWERCASE_LETTERS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          DIGITS,
          UPPERCASE_LETTERS,
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
          UPPERCASE_LETTERS,
          LOWERCASE_LETTERS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          DIGITS,
          SPECIAL_SYMBOLS,
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
          DIGITS,
          SPECIAL_SYMBOLS,
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
          DIGITS,
          UPPERCASE_LETTERS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          LOWERCASE_LETTERS,
          SPECIAL_SYMBOLS,
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
          DIGITS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          LOWERCASE_LETTERS,
          UPPERCASE_LETTERS,
          SPECIAL_SYMBOLS,
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
          LOWERCASE_LETTERS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          DIGITS,
          UPPERCASE_LETTERS,
          SPECIAL_SYMBOLS,
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
          UPPERCASE_LETTERS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          DIGITS,
          LOWERCASE_LETTERS,
          SPECIAL_SYMBOLS,
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
          SPECIAL_SYMBOLS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          DIGITS,
          LOWERCASE_LETTERS,
          UPPERCASE_LETTERS,
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
