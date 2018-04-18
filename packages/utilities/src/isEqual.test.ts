import { isEqual } from './isEqual';

const arrayBase = ['1', '2', '3'];
const arrayControl = ['1', '2', '3'];
const arrayDifferentValues = ['1', '2', '4'];
const arrayDifferentTypes = ['1', '2', 3];
const arrayDifferentLength = ['1', '2', '3', '4'];

const objectBase = { a: '1', b: '2' };
const objectControl = { a: '1', b: '2' };
const objectDifferentValues = { a: '1', b: '3' };
const objectDifferentTypes = { a: '1', b: 2 };
const objectDifferentLength = { a: '1', b: '2', c: '3' };

const numberBase = 123;
const numberControl = 123;
const numberDifferentValues = 1234;
const numberDifferentTypes = '123';

const stringBase = 'This is a string';
const stringControl = 'This is a string';
const stringDifferentValues = 'This is a string that isn\'t the same';

describe('isEquals function helper', () => {
  describe('test indexes', () => {
    it('returns true with arrays with the same values', () => {
      expect(isEqual(arrayBase, arrayControl)).toEqual(true);
    });

    it('returns false with arrays with different values', () => {
      expect(isEqual(arrayBase, arrayDifferentValues)).toEqual(false);
    });

    it('returns false with arrays with different types', () => {
      expect(isEqual(arrayBase, arrayDifferentTypes)).toEqual(false);
    });

    it('returns false with arrays with different length', () => {
      expect(isEqual(arrayBase, arrayDifferentLength)).toEqual(false);
    });
  });

  describe('test objects', () => {
    it('returns true with objects with the same values', () => {
      expect(isEqual(objectBase, objectControl)).toEqual(true);
    });

    it('returns false with objects with different values', () => {
      expect(isEqual(objectBase, objectDifferentValues)).toEqual(false);
    });

    it('returns false with objects with different types', () => {
      expect(isEqual(objectBase, objectDifferentTypes)).toEqual(false);
    });

    it('returns false with objects with different length', () => {
      expect(isEqual(objectBase, objectDifferentLength)).toEqual(false);
    });
  });

  describe('test numbers', () => {
    it('returns true with numbers with the same values', () => {
      expect(isEqual(numberBase, numberControl)).toEqual(true);
    });

    it('returns false with numbers with different values', () => {
      expect(isEqual(numberBase, numberDifferentValues)).toEqual(false);
    });

    it('returns false with numbers with different types', () => {
      expect(isEqual(numberBase, numberDifferentTypes)).toEqual(false);
    });
  });

  describe('test strings', () => {
    it('returns true with strings with the same values', () => {
      expect(isEqual(stringBase, stringControl)).toEqual(true);
    });

    it('returns false with strings with different values', () => {
      expect(isEqual(stringBase, stringDifferentValues)).toEqual(false);
    });
  });
});