import * as React from 'react';
import { toElementArray } from './react-children-utils';

describe('React Children Utils', () => {
  describe('toElementArray', () => {
    // Suppress console.warn by default for this suite so test output stays quiet.
    // We still want one test to assert the warning; that test will restore
    // the original console.warn and spy explicitly.
    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    });

    afterEach(() => {
      // Restore all mocks to return console.warn to its original implementation.
      jest.restoreAllMocks();
    });
    it('filters out non-ReactElement children', () => {
      const children = [
        React.createElement('div', { key: '1' }),
        'text string',
        42,
        null,
        undefined,
        React.createElement('span', { key: '2' }),
      ];

      const result = toElementArray(children);

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('div');
      expect(result[1].type).toBe('span');
    });

    it('handles empty children', () => {
      expect(toElementArray(null)).toEqual([]);
      expect(toElementArray(undefined)).toEqual([]);
      expect(toElementArray([])).toEqual([]);
    });

    it('handles single ReactElement', () => {
      const element = React.createElement('div', { key: '1' });
      const result = toElementArray(element);

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('div');
      expect(result[0].key).toContain('1'); // React adds prefix to keys
    });

    it('flattens nested arrays', () => {
      const children = [
        React.createElement('div', { key: '1' }),
        [React.createElement('span', { key: '2' }), React.createElement('p', { key: '3' })],
      ];

      const result = toElementArray(children);

      expect(result).toHaveLength(3);
      expect(result[0].type).toBe('div');
      expect(result[1].type).toBe('span');
      expect(result[2].type).toBe('p');
    });

    it('calls console.warn for non-ReactElement children', () => {
      // Remove the suite-level suppression so we can assert the warning.
      jest.restoreAllMocks();

      const warnFn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

      const children = [React.createElement('div', { key: '1' }), 'text string'];

      const result = toElementArray(children);

      expect(result).toHaveLength(1);
      expect(warnFn).toHaveBeenCalledTimes(1);

      warnFn.mockRestore();
    });
  });
});
