import {
  clearNext,
  clearPrev,
  clearRange,
  getLeftFormatIndex,
  getMaskDisplay,
  getRightFormatIndex,
  insertString,
  parseMask,
} from './inputMask';
import type { IMaskValue } from './inputMask';

const inputMask = 'Phone number m\\ask: (999) 999 - 9999';

const values: IMaskValue[] = [
  { value: '1', format: /[0-9]/, displayIndex: 20 },
  { value: '2', format: /[0-9]/, displayIndex: 21 },
  { value: '3', format: /[0-9]/, displayIndex: 22 },
  { value: '4', format: /[0-9]/, displayIndex: 25 },
  { value: '5', format: /[0-9]/, displayIndex: 26 },
  { value: undefined, format: /[0-9]/, displayIndex: 27 },
  { value: undefined, format: /[0-9]/, displayIndex: 31 },
  { value: undefined, format: /[0-9]/, displayIndex: 32 },
  { value: undefined, format: /[0-9]/, displayIndex: 33 },
  { value: undefined, format: /[0-9]/, displayIndex: 34 },
];

function resetValues(charData: IMaskValue[], maxIndex: number = Infinity): void {
  for (let i = 0; i < charData.length; i++) {
    if (i < maxIndex) {
      charData[i].value = (i + 1).toString()[0];
    } else {
      charData[i].value = undefined;
    }
  }
}

describe('inputMask', () => {
  it('parses mask sucessfully', () => {
    const result = parseMask(inputMask);
    expect(result.length).toEqual(values.length);

    for (let i = 0; i < values.length; i++) {
      expect(result[i].displayIndex).toEqual(values[i].displayIndex);
    }
  });

  it('parsing ignores escaped format characters', () => {
    const result = parseMask('Esc\\aped some ch\\ar\\acters: (999) 999 - 9999 \\*');
    expect(result.length).toEqual(values.length);
  });

  it('generates displayedMask', () => {
    resetValues(values, 5);
    let result = getMaskDisplay(inputMask, values, '_');
    expect(result).toEqual('Phone number mask: (123) 45_ - ____');

    result = getMaskDisplay(inputMask, values);
    expect(result).toEqual('Phone number mask: (123) 45');

    resetValues(values, 0);
    result = getMaskDisplay(inputMask, values);
    expect(result).toEqual('Phone number mask: (');
  });

  it("generated displayedMask doesn't render escape codes", () => {
    const maskString = 'Esc\\aped Ch\\ar\\acters: (999) 999 - 9999';
    const maskValues = parseMask(maskString);

    resetValues(maskValues, 5);

    let result = getMaskDisplay(maskString, maskValues, '_');
    expect(result).toEqual('Escaped Characters: (123) 45_ - ____');

    result = getMaskDisplay(maskString, maskValues);
    expect(result).toEqual('Escaped Characters: (123) 45');
  });

  it('clearNext works as intended', () => {
    resetValues(values, 5);
    let result = clearNext(values, 20);
    expect(result[0].value).toBeUndefined();

    resetValues(values, 5);
    result = clearNext(values, 22);
    expect(result[2].value).toBeUndefined();

    resetValues(values, 5);
    result = clearNext(values, 23);
    expect(result[3].value).toBeUndefined();
    expect(result[2].value).toBeDefined();
  });

  it('clearPrev works as intended', () => {
    resetValues(values, 5);
    let result = clearPrev(values, 25);
    expect(result[2].value).toBeUndefined();

    resetValues(values, 5);
    result = clearPrev(values, 21);
    expect(result[0].value).toBeUndefined();

    resetValues(values, 5);
    result = clearPrev(values, 20);
    expect(result[0].value).toBeDefined();
  });

  it('clearRange works as intended', () => {
    resetValues(values, 5);
    let result = clearRange(values, 23, 5);
    expect(result[2].value).toBeDefined();
    expect(result[3].value).toBeUndefined();
    expect(result[4].value).toBeUndefined();

    resetValues(values, 5);
    result = clearRange(values, 22, 5);
    expect(result[2].value).toBeUndefined();
    expect(result[3].value).toBeUndefined();
    expect(result[4].value).toBeUndefined();
  });

  it('getLeftFormatIndex works as intended', () => {
    resetValues(values, 5);
    let result = getLeftFormatIndex(values, 23);
    expect(result).toEqual(22);

    resetValues(values, 5);
    result = getLeftFormatIndex(values, 22);
    expect(result).toEqual(21);

    resetValues(values, 5);
    result = getLeftFormatIndex(values, 25);
    expect(result).toEqual(22);
  });

  it('getRightFormatIndex works as intended', () => {
    resetValues(values, 5);
    let result = getRightFormatIndex(values, 23);
    expect(result).toEqual(25);

    resetValues(values, 5);
    result = getRightFormatIndex(values, 22);
    expect(result).toEqual(22);

    resetValues(values, 5);
    result = getRightFormatIndex(values, 25);
    expect(result).toEqual(25);
  });

  it('insertString works as intended', () => {
    resetValues(values, 5);
    const result = insertString(values, 23, '89asdf0asdf98');
    expect(values[3].value).toEqual('8');
    expect(values[4].value).toEqual('9');
    expect(values[5].value).toEqual('0');
    expect(values[6].value).toEqual('9');
    expect(values[7].value).toEqual('8');
    expect(result).toEqual(33);
  });

  it('insertString will keep index at the end even if the value is entered passed the end', () => {
    const maskedValues = [
      { value: '1', format: /[0-9]/, displayIndex: 0 },
      { value: '2', format: /[0-9]/, displayIndex: 1 },
      { value: '3', format: /[0-9]/, displayIndex: 2 },
    ];

    const result = insertString(maskedValues, 3, '1');

    expect(result).toEqual(3);
  });
});
