import { isEqual, isNotEqual } from './isEqual';

describe('isEquals and isNotEquals function helper', () => {
  describe('Test indexes', () => {
    // Set up arrays to compare
    const arrayBase = ['1', '2', '3'];
    const arrayControl = ['1', '2', '3'];
    const arrayDifferentValues = ['1', '2', '4'];
    const arrayDifferentTypes = ['1', '2', 3];
    const arrayDifferentLength = ['1', '2', '3', '4'];

    describe('isEqual', () => {
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

    describe('isNotEqual', () => {
      it('returns true with arrays with the same values', () => {
        expect(isNotEqual(arrayBase, arrayControl)).toEqual(false);
      });
    });
  });

  describe('Test objects', () => {
    // Set up objects to compare
    const objectBase = { a: '1', b: '2' };
    const objectControl = { a: '1', b: '2' };
    const objectDifferentValues = { a: '1', b: '3' };
    const objectDifferentValueTypes = { a: '1', b: 2 };
    const objectDifferentKeyTypes = { 1: '1', 2: '2' };
    const objectDifferentLength = { a: '1', b: '2', c: '3' };

    describe('isEqual', () => {
      it('returns true with objects with the same values', () => {
        expect(isEqual(objectBase, objectControl)).toEqual(true);
      });

      it('returns false with objects with different values', () => {
        expect(isEqual(objectBase, objectDifferentValues)).toEqual(false);
      });

      it('returns false with objects with different value types', () => {
        expect(isEqual(objectBase, objectDifferentValueTypes)).toEqual(false);
      });

      it('returns false with objects with different key types', () => {
        expect(isEqual(objectBase, objectDifferentKeyTypes)).toEqual(false);
      });

      it('returns false with objects with different length', () => {
        expect(isEqual(objectBase, objectDifferentLength)).toEqual(false);
      });
    });

    describe('isNotEqual', () => {
      it('returns true with objects with the same values', () => {
        expect(isNotEqual(objectBase, objectControl)).toEqual(false);
      });
    });
  });

  describe('Test numbers', () => {
    // Set up numbers to compare
    const numberBase = 123;
    const numberControl = 123;
    const numberDifferentValues = 1234;
    const numberDifferentTypes = '123';

    describe('isEqual', () => {
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

    describe('isNotEqual', () => {
      it('returns true with numbers with the same values', () => {
        expect(isNotEqual(numberBase, numberControl)).toEqual(false);
      });
    });
  });

  describe('Test strings', () => {
    // Set up strings to compare
    const stringBase = 'This is a string';
    const stringControl = 'This is a string';
    const stringDifferentValues = "This is a string that isn't the same";

    describe('isEqual', () => {
      it('returns true with strings with the same values', () => {
        expect(isEqual(stringBase, stringControl)).toEqual(true);
      });

      it('returns false with strings with different values', () => {
        expect(isEqual(stringBase, stringDifferentValues)).toEqual(false);
      });
    });

    describe('isNotEqual', () => {
      it('returns true with strings with the same values', () => {
        expect(isNotEqual(stringBase, stringControl)).toEqual(false);
      });
    });
  });
});
