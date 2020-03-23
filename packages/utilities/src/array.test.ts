import {
  findIndex,
  find,
  createArray,
  removeIndex,
  flatten,
  replaceElement,
  addElementAtIndex,
  arraysEqual,
} from './array';

describe('array utils tests', () => {
  describe('findIndex tests', () => {
    it('returns -1 when there is no match in the array', () => {
      const array = [0, 1, 2];
      const index = findIndex(array, () => false);

      expect(index).toEqual(-1);
    });

    it('should return the correct index when the predicate satisfies the condition', () => {
      const array = [0, 1, 2];
      const index = findIndex(array, (elem: number) => elem === 1);

      expect(index).toEqual(1);
    });

    it('should return the first index when repeated elements satisfy the predicate', () => {
      const array = [0, 1, 2, 2];
      const index = findIndex(array, (elem: number) => elem === 2);

      expect(index).toEqual(2);
    });
  });

  describe('find tests', () => {
    it('returns -1 when there is no match in the array', () => {
      const array = [0, 1, 2];
      const item = find(array, () => false);

      expect(item).toEqual(undefined);
    });

    it('should return the correct item when the predicate satisfies the condition', () => {
      const array = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
      const item = find(array, (elem: { id: number }) => elem.id === 1);

      expect(item).toEqual(array[1]);
    });

    it('should return the first index when repeated elements satisfy the predicate', () => {
      const array = [8, 9, 10, 11];
      const item = find(array, (elem: number) => elem === 10);

      expect(item).toEqual(10);
    });
  });

  describe('createArray tests', () => {
    it('creates an array while invoking the callback', () => {
      let result = createArray(4, (index: number) => String.fromCharCode('a'.charCodeAt(0) + index));

      expect(result).toEqual(['a', 'b', 'c', 'd']);
    });
  });

  describe('removeIndex tests', () => {
    it('should return a new array instead of mutating the existing array', () => {
      const array = [0, 1, 2];
      const result = removeIndex(array, 0);
      expect(result).not.toBe(array);
    });

    it('should remove the first element of the array', () => {
      const array = [0, 1, 2];
      const result = removeIndex(array, 0);
      expect(result).toEqual([1, 2]);
    });

    it('should remove the last element of the array', () => {
      const array = [0, 1, 2];
      const result = removeIndex(array, 2);
      expect(result).toEqual([0, 1]);
    });

    it('should remove the element in the middle of the array', () => {
      const array = [0, 1, 2];
      const result = removeIndex(array, 1);
      expect(result).toEqual([0, 2]);
    });
  });

  describe('replaceElement tests', () => {
    it('should return a new array instead of mutating the existing array', () => {
      const array = [1, 2, 3];
      const result = replaceElement(array, 3, 1);
      expect(result).toEqual([1, 3, 3]);
      expect(result).not.toBe(array);
    });

    it('should return a new array with the replaced element in the center', () => {
      const array = ['Zero', 'One', 'Two', 'Three', 'Four'];
      const result = replaceElement(array, 'owT', 2);
      expect(result).toEqual(['Zero', 'One', 'owT', 'Three', 'Four']);
    });

    it('should return a new array with the first element replaced', () => {
      const array = ['Zero', 'One', 'Two', 'Three', 'Four'];
      const result = replaceElement(array, 'oreZ', 0);
      expect(result).toEqual(['oreZ', 'One', 'Two', 'Three', 'Four']);
    });

    it('should return a new array with the last element replaced', () => {
      const array = ['Zero', 'One', 'Two', 'Three', 'Four'];
      const result = replaceElement(array, 'ruoF', 4);
      expect(result).toEqual(['Zero', 'One', 'Two', 'Three', 'ruoF']);
    });
  });

  describe('addElementAddIndex tests', () => {
    it('should add an element at the start of the array', () => {
      const array = [2, 3, 4];
      const result = addElementAtIndex(array, 0, 1);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should add an element at the end of the array', () => {
      const array = [2, 3, 4];
      const result = addElementAtIndex(array, 3, 5);
      expect(result).toEqual([2, 3, 4, 5]);
    });

    it('should add the element in the middle of the array', () => {
      const array = [2, 3, 4];
      const result = addElementAtIndex(array, 2, 3.5);
      expect(result).toEqual([2, 3, 3.5, 4]);
    });
  });

  describe('flatten tests', () => {
    it('does nothing for an empty array', () => {
      const array: number[] = [];
      const result = flatten(array);
      expect(result).toEqual(array);
    });

    it('does nothing an array with a single element', () => {
      const array = [1];
      const result = flatten(array);
      expect(result).toEqual(array);
    });

    it('does nothing for an array of numbers', () => {
      const array = [1, 2, 3];
      const result = flatten(array);
      expect(result).toEqual(array);
    });

    it('flattens an array of arrays', () => {
      const array = [[1, 2, 3], [4, 6, 8], [20]];
      const result = flatten(array);
      expect(result).toEqual([1, 2, 3, 4, 6, 8, 20]);
    });

    it('flattens an array with numbers and arrays of numbers', () => {
      const array = [[1, 2, 3], [4, 6, 8], 20, 22, [25, 26, 28]];
      const result = flatten(array);
      expect(result).toEqual([1, 2, 3, 4, 6, 8, 20, 22, 25, 26, 28]);
    });
  });

  describe('arraysEqual tests', () => {
    it('two empty arrays are equal', () => {
      const arr1: number[] = [];
      const arr2: number[] = [];
      expect(arraysEqual(arr1, arr2)).toEqual(true);
    });

    it('different length arrays are not equal', () => {
      const arr1: number[] = [1, 2];
      const arr2: number[] = [1];
      expect(arraysEqual(arr1, arr2)).toEqual(false);
    });

    it('different value arrays are not equal', () => {
      const arr1: number[] = [1, 2];
      const arr2: number[] = [1, 3];
      expect(arraysEqual(arr1, arr2)).toEqual(false);
    });

    it('two exact arrays are equal', () => {
      const arr1: number[] = [1, 2, 3];
      const arr2: number[] = [1, 2, 3];
      expect(arraysEqual(arr1, arr2)).toEqual(true);
    });
  });
});
