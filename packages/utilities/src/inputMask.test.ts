import {
  clearNext,
  clearPrev,
  clearRange,
  getLeftFormatIndex,
  getMaskDisplay,
  getRightFormatIndex,
  IMaskValue,
  insertString,
  parseMask
} from './inputMask';

const values: IMaskValue[] = [
  { value: '1', format: /[0-9]/, displayIndex: 15 },
  { value: '2', format: /[0-9]/, displayIndex: 16 },
  { value: '3', format: /[0-9]/, displayIndex: 17 },
  { value: '4', format: /[0-9]/, displayIndex: 20 },
  { value: '5', format: /[0-9]/, displayIndex: 21 },
  { value: undefined, format: /[0-9]/, displayIndex: 22 },
  { value: undefined, format: /[0-9]/, displayIndex: 26 },
  { value: undefined, format: /[0-9]/, displayIndex: 27 },
  { value: undefined, format: /[0-9]/, displayIndex: 28 },
  { value: undefined, format: /[0-9]/, displayIndex: 29 },
];

function resetValues(charData: IMaskValue[], maxIndex: number = Infinity): void {
  for (let i = 0; i < charData.length && i < maxIndex; i++) {
    charData[i].value = (i + 1).toString();
  }
}

describe('inputMask', () => {
  it('parses mask sucessfully', () => {
    let result = parseMask('Phone number: (999) 999 - 9999');
    expect(result.length).toEqual(values.length);

    for (let i = 0; i < values.length; i++) {
      expect(result[i].displayIndex).toEqual(values[i].displayIndex);
    }
  });

  it('generates displayedMask', () => {
    resetValues(values, 5);
    let result = getMaskDisplay('Phone number: (999) 999 - 9999', values, '_');
    expect(result).toEqual('Phone number: (123) 45_ - ____');

    result = getMaskDisplay('Phone number: (999) 999 - 9999', values);
    expect(result).toEqual('Phone number: (123) 45');
  });

  it('clearNext works as intended', () => {
    resetValues(values, 5);
    let result = clearNext(values, 15);
    expect(result[0].value).toBeUndefined();

    resetValues(values, 5);
    result = clearNext(values, 17);
    expect(result[2].value).toBeUndefined();

    resetValues(values, 5);
    result = clearNext(values, 18);
    expect(result[3].value).toBeUndefined();
    expect(result[2].value).toBeDefined();
  });

  it('clearPrev works as intended', () => {
    resetValues(values, 5);
    let result = clearPrev(values, 20);
    expect(result[2].value).toBeUndefined();

    resetValues(values, 5);
    result = clearPrev(values, 16);
    expect(result[0].value).toBeUndefined();

    resetValues(values, 5);
    result = clearPrev(values, 15);
    expect(result[0].value).toBeDefined();
  });

  it('clearRange works as intended', () => {
    resetValues(values, 5);
    let result = clearRange(values, 18, 5);
    expect(result[2].value).toBeDefined();
    expect(result[3].value).toBeUndefined();
    expect(result[4].value).toBeUndefined();

    resetValues(values, 5);
    result = clearRange(values, 17, 5);
    expect(result[2].value).toBeUndefined();
    expect(result[3].value).toBeUndefined();
    expect(result[4].value).toBeUndefined();
  });

  it('getLeftFormatIndex works as intended', () => {
    resetValues(values, 5);
    let result = getLeftFormatIndex(values, 18);
    expect(result).toEqual(17);

    resetValues(values, 5);
    result = getLeftFormatIndex(values, 17);
    expect(result).toEqual(16);

    resetValues(values, 5);
    result = getLeftFormatIndex(values, 20);
    expect(result).toEqual(17);
  });

  it('getRightFormatIndex works as intended', () => {
    resetValues(values, 5);
    let result = getRightFormatIndex(values, 18);
    expect(result).toEqual(20);

    resetValues(values, 5);
    result = getRightFormatIndex(values, 17);
    expect(result).toEqual(17);

    resetValues(values, 5);
    result = getRightFormatIndex(values, 20);
    expect(result).toEqual(20);
  });

  it('insertString works as intended', () => {
    resetValues(values, 5);
    let result = insertString(values, 18, '89asdf0asdf98');
    expect(values[3].value).toEqual('8');
    expect(values[4].value).toEqual('9');
    expect(values[5].value).toEqual('0');
    expect(values[6].value).toEqual('9');
    expect(values[7].value).toEqual('8');
    expect(result).toEqual(28);
  });
});
