import { Validators } from './Validators';

describe('Simple form validators test', () => {
  const customMessage = 'Custom Error Message';

  it('Integer validator', () => {
    expect(Validators.isInteger(customMessage)(null)).toBeFalsy();
    expect(Validators.isInteger(customMessage)(undefined)).toBeFalsy();
    expect(Validators.isInteger(customMessage)('4.1')).toEqual(customMessage);
    expect(Validators.isInteger(customMessage)('4')).toBeFalsy();
    expect(Validators.isInteger(customMessage)('4.0')).toBeFalsy();
  });
  it('Length validator', () => {
    expect(Validators.length(4, () => customMessage)('----')).toBeFalsy();
    expect(Validators.length(4, () => customMessage)('-----')).toBeTruthy();
    expect(Validators.length(4, () => customMessage)(null)).toEqual(customMessage);
    expect(Validators.length(4, () => customMessage)(undefined)).toEqual(customMessage);
  });

  it('MinLength validator', () => {
    expect(Validators.minLength(4, () => customMessage)('----')).toBeFalsy();
    expect(Validators.minLength(4, () => customMessage)('-----')).toBeFalsy();
    expect(Validators.minLength(4, () => customMessage)('---')).toEqual(customMessage);
    expect(Validators.minLength(4, () => customMessage)(null)).toEqual(customMessage);
    expect(Validators.minLength(4, () => customMessage)(undefined)).toEqual(customMessage);
  });

  it('MaxLength validator', () => {
    expect(Validators.maxLength(4, () => customMessage)(null)).toBeFalsy();
    expect(Validators.maxLength(4, () => customMessage)(undefined)).toBeFalsy();
    expect(Validators.maxLength(4, () => customMessage)('----')).toBeFalsy();
    expect(Validators.maxLength(4, () => customMessage)('-----')).toEqual(customMessage);
  });

  it('MinValue validator', () => {
    expect(Validators.minValue(4, () => customMessage)(null)).toBeFalsy();
    expect(Validators.minValue(4, () => customMessage)(undefined)).toBeFalsy();
    expect(Validators.minValue(4, () => customMessage)('----')).toBeFalsy();
    expect(Validators.minValue(4, () => customMessage)('3')).toEqual(customMessage);
    expect(Validators.minValue(4, () => customMessage)('5')).toBeFalsy();
    expect(Validators.minValue(0, () => customMessage)('.8')).toBeFalsy();
  });

  it('MaxValue validator', () => {
    expect(Validators.maxValue(4, () => customMessage)(null)).toBeFalsy();
    expect(Validators.maxValue(4, () => customMessage)(undefined)).toBeFalsy();
    expect(Validators.maxValue(4, () => customMessage)('----')).toBeFalsy();
    expect(Validators.maxValue(4, () => customMessage)('5')).toEqual(customMessage);
    expect(Validators.maxValue(4, () => customMessage)('3')).toBeFalsy();
    expect(Validators.maxValue(4, () => customMessage)('.8')).toBeFalsy();
  });

  it('Regex validator', () => {
    expect(Validators.regex(/^(.)*$/, customMessage)('anything')).toBeFalsy();
    expect(Validators.regex(/^([0-9])*$/, customMessage)('10202')).toBeFalsy();
    expect(Validators.regex(/^([0-9])*$/, customMessage)('letters')).toEqual(customMessage);
  });

  it('Number validator', () => {
    expect(Validators.isNumber(customMessage)('abcd')).toEqual(customMessage);
    expect(Validators.isNumber(customMessage)(null)).toBeFalsy();
    expect(Validators.isNumber(customMessage)('')).toBeFalsy();
    expect(Validators.isNumber(customMessage)('10')).toBeFalsy();
    expect(Validators.isNumber(customMessage)('10.1')).toBeFalsy();
  });

  it('Required validator', () => {
    expect(Validators.required(customMessage)(null)).toEqual(customMessage);
    expect(Validators.required(customMessage)(undefined)).toEqual(customMessage);
    expect(Validators.required(customMessage)('')).toEqual(customMessage);
    expect(Validators.required(customMessage)([])).toEqual(customMessage);

    expect(Validators.required(customMessage)(0)).toBeFalsy();
    expect(Validators.required(customMessage)('HelloWorld')).toBeFalsy();
    expect(Validators.required(customMessage)([1, 2, 3])).toBeFalsy();
    expect(Validators.required(customMessage)(['a', 'b', 'c'])).toBeFalsy();
  });
});
