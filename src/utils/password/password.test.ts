import {
  generatePassword,
  getPossibleCharsInSet,
  testPasswordEntropy,
  testPasswordStrength,
  testPasswordStrengthFromEntropy,
} from './password';
import { PasswordCharsSet, PasswordStrength } from '../../constants/password';

const CHAR_SETS = {
  SPECIAL_SYMBOLS: '~`! @#$%^&*()_-+={[}]|\\:;"\'<,>.?/',
  LOWERCASE_LETTERS: 'abcdefghijklmnopqrstuvwxyz',
  DIGITS: '0123456789',
  UPPERCASE_LETTERS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

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
      expect(hasThisSymbols(CHAR_SETS.DIGITS, possibleSymbols)).toBeTruthy();
    });

    it('lowercase', () => {
      const possibleSymbols = getPossibleCharsInSet(PasswordCharsSet.LowercaseLetters);
      expect(hasThisSymbols(CHAR_SETS.LOWERCASE_LETTERS, possibleSymbols)).toBeTruthy();
    });

    it('Uppercase', () => {
      const possibleSymbols = getPossibleCharsInSet(PasswordCharsSet.UppercaseLetters);
      expect(hasThisSymbols(CHAR_SETS.UPPERCASE_LETTERS.toUpperCase(), possibleSymbols)).toBeTruthy();
    });

    it('Special symbols', () => {
      const possibleSpecialSymbols = getPossibleCharsInSet(PasswordCharsSet.SpecialSymbols);
      expect(hasThisSymbols(CHAR_SETS.SPECIAL_SYMBOLS, possibleSpecialSymbols)).toBeTruthy();
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
          passwordCharsSets: [
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
          passwordCharsSets: [
            PasswordCharsSet.Digits,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          CHAR_SETS.LOWERCASE_LETTERS,
          CHAR_SETS.UPPERCASE_LETTERS,
          CHAR_SETS.SPECIAL_SYMBOLS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          CHAR_SETS.DIGITS,
        ])).toBeTruthy();
      }
    });

    it('Simple password that have only lower-case letters', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSets: [
            PasswordCharsSet.LowercaseLetters,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          CHAR_SETS.UPPERCASE_LETTERS,
          CHAR_SETS.DIGITS,
          CHAR_SETS.SPECIAL_SYMBOLS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          CHAR_SETS.LOWERCASE_LETTERS,
        ])).toBeTruthy();
      }
    });

    it('Simple password that have only upper-case letters', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSets: [
            PasswordCharsSet.UppercaseLetters,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          CHAR_SETS.LOWERCASE_LETTERS,
          CHAR_SETS.DIGITS,
          CHAR_SETS.SPECIAL_SYMBOLS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          CHAR_SETS.UPPERCASE_LETTERS,
        ])).toBeTruthy();
      }
    });

    it('Simple password that have only special symbols', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSets: [
            PasswordCharsSet.SpecialSymbols,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          CHAR_SETS.LOWERCASE_LETTERS,
          CHAR_SETS.DIGITS,
          CHAR_SETS.UPPERCASE_LETTERS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          CHAR_SETS.SPECIAL_SYMBOLS,
        ])).toBeTruthy();
      }
    });

    it('Password that have digits and lower-case letters', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSets: [
            PasswordCharsSet.Digits,
            PasswordCharsSet.LowercaseLetters,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          CHAR_SETS.SPECIAL_SYMBOLS,
          CHAR_SETS.UPPERCASE_LETTERS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          CHAR_SETS.DIGITS,
          CHAR_SETS.LOWERCASE_LETTERS,
        ])).toBeTruthy();
      }
    });

    it('Password that have digits and upper-case letters', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSets: [
            PasswordCharsSet.Digits,
            PasswordCharsSet.UppercaseLetters,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          CHAR_SETS.SPECIAL_SYMBOLS,
          CHAR_SETS.LOWERCASE_LETTERS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          CHAR_SETS.DIGITS,
          CHAR_SETS.UPPERCASE_LETTERS,
        ])).toBeTruthy();
      }
    });

    it('Password that have digits and special symbols', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSets: [
            PasswordCharsSet.Digits,
            PasswordCharsSet.SpecialSymbols,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          CHAR_SETS.UPPERCASE_LETTERS,
          CHAR_SETS.LOWERCASE_LETTERS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          CHAR_SETS.DIGITS,
          CHAR_SETS.SPECIAL_SYMBOLS,
        ])).toBeTruthy();
      }
    });

    it('Password that have lower-case and upper-case letters', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSets: [
            PasswordCharsSet.LowercaseLetters,
            PasswordCharsSet.UppercaseLetters,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          CHAR_SETS.DIGITS,
          CHAR_SETS.SPECIAL_SYMBOLS,
        ])).toBeTruthy();
      }
    });

    it('Password that have lower-case letters and special symbols', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSets: [
            PasswordCharsSet.LowercaseLetters,
            PasswordCharsSet.SpecialSymbols,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          CHAR_SETS.DIGITS,
          CHAR_SETS.UPPERCASE_LETTERS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          CHAR_SETS.LOWERCASE_LETTERS,
          CHAR_SETS.SPECIAL_SYMBOLS,
        ])).toBeTruthy();
      }
    });

    it('Difficult password that have everything except digits', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSets: [
            PasswordCharsSet.LowercaseLetters,
            PasswordCharsSet.UppercaseLetters,
            PasswordCharsSet.SpecialSymbols,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          CHAR_SETS.DIGITS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          CHAR_SETS.LOWERCASE_LETTERS,
          CHAR_SETS.UPPERCASE_LETTERS,
          CHAR_SETS.SPECIAL_SYMBOLS,
        ])).toBeTruthy();
      }
    });

    it('Difficult password that have everything except lower-case letters', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSets: [
            PasswordCharsSet.Digits,
            PasswordCharsSet.UppercaseLetters,
            PasswordCharsSet.SpecialSymbols,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          CHAR_SETS.LOWERCASE_LETTERS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          CHAR_SETS.DIGITS,
          CHAR_SETS.UPPERCASE_LETTERS,
          CHAR_SETS.SPECIAL_SYMBOLS,
        ])).toBeTruthy();
      }
    });

    it('Difficult password that have everything except upper-case letters', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSets: [
            PasswordCharsSet.Digits,
            PasswordCharsSet.LowercaseLetters,
            PasswordCharsSet.SpecialSymbols,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          CHAR_SETS.UPPERCASE_LETTERS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          CHAR_SETS.DIGITS,
          CHAR_SETS.LOWERCASE_LETTERS,
          CHAR_SETS.SPECIAL_SYMBOLS,
        ])).toBeTruthy();
      }
    });

    it('Difficult password that have everything except special symbols', () => {
      for (let i = 0; i < ITERATIONS; i += 1) {
        const password = generatePassword({
          length: randomStandardPasswordLength(),
          passwordCharsSets: [
            PasswordCharsSet.Digits,
            PasswordCharsSet.LowercaseLetters,
            PasswordCharsSet.UppercaseLetters,
          ],
        });

        expect(passwordDontHaveCharsFromSets(password, [
          CHAR_SETS.SPECIAL_SYMBOLS,
        ])).toBeTruthy();

        expect(passwordHaveCharsFromSets(password, [
          CHAR_SETS.DIGITS,
          CHAR_SETS.LOWERCASE_LETTERS,
          CHAR_SETS.UPPERCASE_LETTERS,
        ])).toBeTruthy();
      }
    });

    it('Trying to generate password without any PasswordCharsSet should be impossible', () => {
      expect(() => generatePassword(
        { length: 10, passwordCharsSets: [] },
      )).toThrowError('passwordCharsSet couldn\'t be empty');
    });
  });

  describe('testPasswordEntropy', () => {
    it('Entropy for password that have 4 symbols and only digits', () => {
      const entropy = testPasswordEntropy({
        length: 4,
        passwordCharsSets: [
          PasswordCharsSet.Digits,
        ],
      });

      expect(entropy).toBeCloseTo(4 * Math.log2(CHAR_SETS.DIGITS.length), 4);
    });
  });

  describe('testPasswordEntropy', () => {
    it('Entropy for all letter and 10 symbols', () => {
      const entropy = testPasswordEntropy({
        length: 10,
        passwordCharsSets: [
          PasswordCharsSet.LowercaseLetters,
          PasswordCharsSet.UppercaseLetters,
        ],
      });

      expect(entropy)
        .toBeCloseTo(10 * Math.log2(
          CHAR_SETS.LOWERCASE_LETTERS.length + CHAR_SETS.UPPERCASE_LETTERS.length,
        ), 4);
    });
  });

  describe('testPasswordEntropy', () => {
    it('Entropy for all letters and special symbols excluding digits and 16 symbols', () => {
      const entropy = testPasswordEntropy({
        length: 16,
        passwordCharsSets: [
          PasswordCharsSet.LowercaseLetters,
          PasswordCharsSet.UppercaseLetters,
          PasswordCharsSet.SpecialSymbols,
        ],
      });

      expect(entropy)
        .toBeCloseTo(16 * Math.log2(
          CHAR_SETS.LOWERCASE_LETTERS.length
      + CHAR_SETS.UPPERCASE_LETTERS.length
          + CHAR_SETS.SPECIAL_SYMBOLS.length,
        ), 4);
    });
  });

  describe('testPasswordEntropy', () => {
    it('Entropy for password that have length = 30 and all symbols', () => {
      const entropy = testPasswordEntropy({
        length: 30,
        passwordCharsSets: [
          PasswordCharsSet.Digits,
          PasswordCharsSet.LowercaseLetters,
          PasswordCharsSet.UppercaseLetters,
          PasswordCharsSet.SpecialSymbols,
        ],
      });

      expect(entropy).toBeCloseTo(30 * Math.log2(
        CHAR_SETS.DIGITS.length
        + CHAR_SETS.LOWERCASE_LETTERS.length
        + CHAR_SETS.UPPERCASE_LETTERS.length
        + CHAR_SETS.SPECIAL_SYMBOLS.length,
      ), 4);
    });
  });

  describe('testPasswordStrengthFromEntropy', () => {
    it('test Very Weak password (medium)', () => {
      const strength = testPasswordStrengthFromEntropy(3);
      expect(strength).toBe(PasswordStrength.TooWeak);
    });

    it('test Very Weak password (lower bound)', () => {
      const strength = testPasswordStrengthFromEntropy(0);
      expect(strength).toBe(PasswordStrength.TooWeak);
    });

    it('test Weak password (medium)', () => {
      const strength = testPasswordStrengthFromEntropy(25);
      expect(strength).toBe(PasswordStrength.Weak);
    });

    it('test Weak password (lower bound)', () => {
      const strength = testPasswordStrengthFromEntropy(20);
      expect(strength).toBe(PasswordStrength.Weak);
    });

    it('test Medium password (lower bound)', () => {
      const strength = testPasswordStrengthFromEntropy(45);
      expect(strength).toBe(PasswordStrength.Medium);
    });

    it('test Medium password (lower bound)', () => {
      const strength = testPasswordStrengthFromEntropy(35);
      expect(strength).toBe(PasswordStrength.Medium);
    });

    it('test Strong password (lower bound)', () => {
      const strength = testPasswordStrengthFromEntropy(100000000);
      expect(strength).toBe(PasswordStrength.Strong);
    });

    it('test Strong password (lower bound)', () => {
      const strength = testPasswordStrengthFromEntropy(55);
      expect(strength).toBe(PasswordStrength.Strong);
    });
  });
});
