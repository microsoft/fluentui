import * as utils from '../../utilities/utilities';

describe('Unit test to convert data to localized string', () => {
  test('Should return undefined when data provided is undefined', () => {
    expect(utils.convertToLocaleString(undefined)).toBeUndefined();
  });

  test('Should return the localised data in the given culture when input data is a string', () => {
    expect(utils.convertToLocaleString('text', 'en-GB')).toBe('text');
    expect(utils.convertToLocaleString('text', 'ar-SY')).toBe('text');
  });

  test('Should return the localised data in the given culture when the input data is a number', () => {
    expect(utils.convertToLocaleString(10, 'en-GB')).toBe('10');
    expect(utils.convertToLocaleString(2560, 'ar-SY')).toBe('٢٬٥٦٠');
  });

  test('Should return the localised data when the input data is a string containing a number', () => {
    expect(utils.convertToLocaleString('10', 'en-GB')).toBe('10');
    expect(utils.convertToLocaleString('1234', 'ar-SY')).toBe('١٬٢٣٤');
  });
});

describe('Unit test to return the accessible data object', () => {
  test('Should return the appropriate accessible data object no parameters are provided as input', () => {
    expect(utils.getAccessibleDataObject()).toEqual({
      role: 'text',
      'data-is-focusable': true,
      'aria-label': undefined,
      'aria-labelledby': undefined,
      'aria-describedby': undefined,
    });
  });

  test('Should return the appropriate accessible data object only role is provided as input', () => {
    expect(utils.getAccessibleDataObject(undefined, 'button')).toEqual({
      role: 'button',
      'data-is-focusable': true,
      'aria-label': undefined,
      'aria-labelledby': undefined,
      'aria-describedby': undefined,
    });
  });

  test('Should return the accessible data when both role and isDataFocusable is provided as input', () => {
    expect(utils.getAccessibleDataObject(undefined, 'text', false)).toEqual({
      role: 'text',
      'data-is-focusable': false,
      'aria-label': undefined,
      'aria-labelledby': undefined,
      'aria-describedby': undefined,
    });
  });

  test('Should return the appropriate accessible data object when all parameters are provided as input', () => {
    const accessibleData = {
      ariaLabel: 'Start button',
      ariaLabelledBy: 'Button',
      ariaDescribedBy: 'This is a start button',
    };
    expect(utils.getAccessibleDataObject(accessibleData, 'button', false)).toEqual({
      role: 'button',
      'data-is-focusable': false,
      'aria-label': 'Start button',
      'aria-labelledby': 'Button',
      'aria-describedby': 'This is a start button',
    });
  });
});
