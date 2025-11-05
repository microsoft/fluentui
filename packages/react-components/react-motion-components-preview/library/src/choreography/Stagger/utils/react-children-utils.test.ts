import * as React from 'react';
import { toElementArray } from './react-children-utils';

describe('React Children Utils', () => {
  describe('toElementArray', () => {
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
  });
});
