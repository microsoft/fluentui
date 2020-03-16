import { find, isOverridden, filter, getValues, removeNulls } from 'src/components/Debug/utils';

describe('debugUtils', () => {
  describe('find', () => {
    test('returns true if key matches search', () => {
      const search = 'color';
      const key = 'color';
      const obj = { [key]: 'red' };

      expect(find(obj, key, search)).toEqual(true);
    });

    test('returns true if value matches search', () => {
      const search = 'red';
      const key = 'color';
      const obj = { [key]: 'red' };

      expect(find(obj, key, search)).toEqual(true);
    });

    test('returns false if value does not match search', () => {
      const search = 'red';
      const key = 'color';
      const obj = { [key]: 'blue' };

      expect(find(obj, key, search)).toEqual(false);
    });

    test('returns true if key includes search', () => {
      const search = 'color';
      const key = 'backgroundColor';
      const obj = { [key]: 'red' };

      expect(find(obj, key, search)).toEqual(true);
    });

    test('returns true if value includes search', () => {
      const search = 'red';
      const key = 'backgroundColor';
      const obj = { [key]: 'darkred' };

      expect(find(obj, key, search)).toEqual(true);
    });
  });

  describe('isOverridden', () => {
    test('returns true if there is override', () => {
      const key = 'color';
      const data = {
        [key]: 'red',
      };

      const overrides = {
        [key]: 'blue',
      };

      expect(isOverridden(data, key, overrides)).toEqual(true);
    });

    test('returns false if is not override', () => {
      const key = 'color';
      const data = {
        [key]: 'red',
      };

      const overrides = {
        backgroundColor: 'blue',
      };

      expect(isOverridden(data, key, overrides)).toEqual(false);
    });

    test('gracefully handles null and undefine', () => {
      const key = 'color';
      const data = {
        [key]: 'red',
      };

      let overrides = null;
      expect(isOverridden(data, key, overrides)).toEqual(false);
      expect(() => isOverridden(data, key, overrides)).not.toThrow();

      overrides = undefined;
      expect(isOverridden(data, key, overrides)).toEqual(false);
      expect(() => isOverridden(data, key, overrides)).not.toThrow();

      overrides = {
        [key]: null,
      };
      expect(isOverridden(data, key, overrides)).toEqual(false);
      expect(() => isOverridden(data, key, overrides)).not.toThrow();

      overrides = {
        [key]: undefined,
      };
      expect(isOverridden(data, key, overrides)).toEqual(false);
      expect(() => isOverridden(data, key, overrides)).not.toThrow();
    });
  });

  describe('filter', () => {
    test('filters primitives correctly by keys', () => {
      const search = 'backgroundColor';
      const data = {
        color: 'red',
        backgroundColor: 'white',
      };

      expect(filter(data, search)).toMatchObject({
        backgroundColor: 'white',
      });
    });

    test('filters primitives correctly by value', () => {
      const search = 'white';
      const data = {
        color: 'red',
        backgroundColor: 'white',
      };

      expect(filter(data, search)).toMatchObject({
        backgroundColor: 'white',
      });
    });

    test('filters primitives correctly by key (includes)', () => {
      const search = 'color';
      const data = {
        color: 'red',
        backgroundColor: 'white',
      };

      expect(filter(data, search)).toMatchObject(data);
    });

    test('filters objects correctly by key', () => {
      const search = 'color';
      const data = {
        color: 'red',
        backgroundColor: 'white',
        ':hover': {
          color: 'red',
          border: '1px',
        },
      };

      expect(filter(data, search)).toMatchObject(data);
    });

    test('filters objects correctly by object key', () => {
      const search = ':hover';
      const data = {
        color: 'red',
        backgroundColor: 'white',
        ':hover': {
          color: 'red',
          border: '1px',
        },
      };

      expect(filter(data, search)).toMatchObject({
        ':hover': {
          color: 'red',
          border: '1px',
        },
      });
    });

    test('filters objects correctly by value', () => {
      const search = 'red';
      const data = {
        color: 'red',
        backgroundColor: 'white',
        ':hover': {
          color: 'red',
          border: '1px',
        },
      };

      expect(filter(data, search)).toMatchObject({
        color: 'red',
        ':hover': {
          color: 'red',
          border: '1px',
        },
      });
    });
  });

  describe('getValues', () => {
    const prefix = 'prefix.';
    const predicate = val => val.indexOf(prefix) === 0;

    test('returns value if it is string', () => {
      const val = `${prefix}value`;

      expect(getValues(val, predicate)).toEqual([val]);
    });

    test('returns value if it is object', () => {
      const val = `${prefix}value`;

      expect(getValues({ someKey: val }, predicate)).toEqual([val]);
    });

    test('returns empty array if predicate does not match on primitive value', () => {
      const val = `value`;

      expect(getValues(val, predicate)).toEqual([]);
    });

    test('returns empty array if predicate does not match on object', () => {
      const val = `value`;

      expect(getValues({ someKey: val }, predicate)).toEqual([]);
    });

    test('returns array with all matching values', () => {
      const data = {
        key1: `${prefix}value1`,
        key2: 'value2',
        key3: {
          key4: 'value4',
          key5: `${prefix}value5`,
          key6: {
            key7: `${prefix}value7`,
            key8: `value8`,
          },
        },
      };

      expect(getValues(data, predicate)).toEqual([`${prefix}value1`, `${prefix}value5`, `${prefix}value7`]);
    });
  });

  describe('removeNulls', () => {
    test('removes nulls values on first level', () => {
      const data = {
        key1: null,
        key2: 'value2',
      };

      expect(removeNulls(data)).toMatchObject({ key2: 'value2' });
    });

    test('removes nested nulls values', () => {
      const data = {
        key1: {
          key2: null,
          key3: 'value2',
        },
      };

      expect(removeNulls(data)).toMatchObject({
        key1: {
          key3: 'value2',
        },
      });
    });

    test('removes nested object if all values are removed', () => {
      const data = {
        key1: {
          key2: null,
          key3: null,
        },
        key4: 'value4',
      };

      expect(removeNulls(data)).toMatchObject({ key4: 'value4' });
    });
  });
});
