import * as React from 'react';
import { toElementArray, isFragment, childrenOrFragmentToArray } from './react-children-utils';

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

  describe('isFragment', () => {
    it('returns true for React Fragment', () => {
      const fragment = React.createElement(React.Fragment, {}, 'content');
      expect(isFragment(fragment)).toBe(true);
    });

    it('returns false for regular React elements', () => {
      const element = React.createElement('div', {}, 'content');
      expect(isFragment(element)).toBe(false);
    });
  });

  describe('childrenOrFragmentToArray', () => {
    it('extracts children from Fragment', () => {
      const fragmentChildren = [React.createElement('div', { key: '1' }), React.createElement('span', { key: '2' })];
      const fragment = React.createElement(React.Fragment, {}, ...fragmentChildren);

      const result = childrenOrFragmentToArray(fragment);

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('div');
      expect(result[1].type).toBe('span');
    });

    it('handles regular JSX children', () => {
      const children = [React.createElement('div', { key: '1' }), 'text', React.createElement('span', { key: '2' })];

      const result = childrenOrFragmentToArray(children);

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('div');
      expect(result[1].type).toBe('span');
    });

    it('handles empty Fragment', () => {
      const fragment = React.createElement(React.Fragment);
      const result = childrenOrFragmentToArray(fragment);
      expect(result).toEqual([]);
    });

    it('handles mixed content in Fragment', () => {
      const fragmentChildren = [
        React.createElement('div', { key: '1' }),
        'text string',
        null,
        React.createElement('span', { key: '2' }),
      ];
      const fragment = React.createElement(React.Fragment, {}, ...fragmentChildren);

      const result = childrenOrFragmentToArray(fragment);

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('div');
      expect(result[1].type).toBe('span');
    });
  });
});
