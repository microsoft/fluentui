import { getMaskDisplay, getValueFromMaskDisplay } from './inputMask';

describe('inputMask', () => {
  it('generates displayedMask', () => {
    let result = getMaskDisplay('Phone number: (999) 999 - 9999', '12345', '_');
    expect(result).toEqual('Phone number: (123) 45_ - ____');

    result = getMaskDisplay('Phone number: (999) 999 - 9999', '12345');
    expect(result).toEqual('Phone number: (123) 45');
  });

  it('generates input value no changes', () => {
    let result = getValueFromMaskDisplay(
      'Phone number: (999) 999 - 9999',
      'Phone number: (123) 45_ - ____');
    expect(result).toEqual('12345');

    result = getValueFromMaskDisplay(
      'Phone number: (999) 999 - 9999',
      'Phone number: (123) 45');
    expect(result).toEqual('12345');
  });

  it('generates input value after inserted char', () => {
    let result = getValueFromMaskDisplay(
      'Phone number: (999) 999 - 9999',
      'Phone number: (123) 456_ - ____');
    expect(result).toEqual('123456');

    result = getValueFromMaskDisplay(
      'Phone number: (999) 999 - 9999',
      'Phone number: (0123) 45');
    expect(result).toEqual('01245');
  });

  it('generates input value after deleted char', () => {
    let result = getValueFromMaskDisplay(
      'Phone number: (999) 999 - 9999',
      'Phone number: (123) 4_ - ____');
    expect(result).toEqual('1234');

    result = getValueFromMaskDisplay(
      'Phone number: (999) 999 - 9999',
      'Phone number: (123) 4');
    expect(result).toEqual('1234');

    result = getValueFromMaskDisplay(
      'Phone number: (999) 999 - 9999',
      'Phone number: (12) 45_ - ____');
    expect(result).toEqual('12');

    result = getValueFromMaskDisplay(
      'Phone number: (999) 999 - 9999',
      '');
    expect(result).toEqual('');

    result = getValueFromMaskDisplay(
      'Phone number: (999) 999 - 9999',
      'Phone number: (12');
    expect(result).toEqual('12');
  });
});
