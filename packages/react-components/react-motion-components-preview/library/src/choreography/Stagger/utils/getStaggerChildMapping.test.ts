import * as React from 'react';
import { getStaggerChildMapping } from './getStaggerChildMapping';

describe('getStaggerChildMapping', () => {
  it('should map children to keys with element and index', () => {
    const children = [
      React.createElement('div', { key: 'a' }, 'First'),
      React.createElement('div', { key: 'b' }, 'Second'),
      React.createElement('div', { key: 'c' }, 'Third'),
    ];

    const mapping = getStaggerChildMapping(children);

    // React.Children.toArray normalizes keys by adding .$ prefix
    expect(Object.keys(mapping)).toEqual(['.$a', '.$b', '.$c']);
    expect(mapping['.$a'].index).toBe(0);
    expect(mapping['.$b'].index).toBe(1);
    expect(mapping['.$c'].index).toBe(2);
  });

  it('should generate keys for children without explicit keys', () => {
    const children = [
      React.createElement('div', null, 'First'),
      React.createElement('div', null, 'Second'),
      React.createElement('div', null, 'Third'),
    ];

    const mapping = getStaggerChildMapping(children);

    // React.Children.toArray auto-generates keys as .0, .1, .2
    expect(Object.keys(mapping)).toEqual(['.0', '.1', '.2']);
    expect(mapping['.0'].index).toBe(0);
    expect(mapping['.1'].index).toBe(1);
    expect(mapping['.2'].index).toBe(2);
  });

  it('should handle empty children', () => {
    expect(getStaggerChildMapping([])).toEqual({});
    expect(getStaggerChildMapping(null)).toEqual({});
    expect(getStaggerChildMapping(undefined)).toEqual({});
  });

  it('should handle single child', () => {
    const child = React.createElement('div', { key: 'single' }, 'Single Item');
    const mapping = getStaggerChildMapping(child);

    expect(Object.keys(mapping)).toEqual(['.$single']);
    expect(mapping['.$single'].index).toBe(0);
  });

  it('should detect when children are added', () => {
    const childrenBefore = [React.createElement('div', { key: 'a' }), React.createElement('div', { key: 'b' })];

    const childrenAfter = [
      React.createElement('div', { key: 'a' }),
      React.createElement('div', { key: 'b' }),
      React.createElement('div', { key: 'c' }),
    ];

    const mappingBefore = getStaggerChildMapping(childrenBefore);
    const mappingAfter = getStaggerChildMapping(childrenAfter);

    expect(Object.keys(mappingBefore)).toEqual(['.$a', '.$b']);
    expect(Object.keys(mappingAfter)).toEqual(['.$a', '.$b', '.$c']);
    expect(mappingAfter['.$c']).toBeDefined();
  });

  it('should detect when children are removed', () => {
    const childrenBefore = [
      React.createElement('div', { key: 'a' }),
      React.createElement('div', { key: 'b' }),
      React.createElement('div', { key: 'c' }),
    ];

    const childrenAfter = [React.createElement('div', { key: 'a' }), React.createElement('div', { key: 'c' })];

    const mappingBefore = getStaggerChildMapping(childrenBefore);
    const mappingAfter = getStaggerChildMapping(childrenAfter);

    expect(Object.keys(mappingBefore)).toEqual(['.$a', '.$b', '.$c']);
    expect(Object.keys(mappingAfter)).toEqual(['.$a', '.$c']);
    expect(mappingAfter['.$b']).toBeUndefined();
  });

  it('should detect when children are reordered', () => {
    const childrenBefore = [
      React.createElement('div', { key: 'a' }),
      React.createElement('div', { key: 'b' }),
      React.createElement('div', { key: 'c' }),
    ];

    const childrenAfter = [
      React.createElement('div', { key: 'c' }),
      React.createElement('div', { key: 'a' }),
      React.createElement('div', { key: 'b' }),
    ];

    const mappingBefore = getStaggerChildMapping(childrenBefore);
    const mappingAfter = getStaggerChildMapping(childrenAfter);

    // Keys remain the same
    expect(Object.keys(mappingBefore).sort()).toEqual(Object.keys(mappingAfter).sort());

    // But indices change
    expect(mappingBefore['.$a'].index).toBe(0);
    expect(mappingAfter['.$a'].index).toBe(1);
    expect(mappingBefore['.$c'].index).toBe(2);
    expect(mappingAfter['.$c'].index).toBe(0);
  });

  it('should handle simultaneous add and remove (count stays same)', () => {
    const childrenBefore = [
      React.createElement('div', { key: 'a' }),
      React.createElement('div', { key: 'b' }),
      React.createElement('div', { key: 'c' }),
    ];

    const childrenAfter = [
      React.createElement('div', { key: 'a' }),
      React.createElement('div', { key: 'd' }), // 'b' removed, 'd' added
      React.createElement('div', { key: 'c' }),
    ];

    const mappingBefore = getStaggerChildMapping(childrenBefore);
    const mappingAfter = getStaggerChildMapping(childrenAfter);

    // Count stays same (3 items)
    expect(Object.keys(mappingBefore).length).toBe(3);
    expect(Object.keys(mappingAfter).length).toBe(3);

    // But keys changed
    expect(mappingBefore['.$b']).toBeDefined();
    expect(mappingBefore['.$d']).toBeUndefined();
    expect(mappingAfter['.$b']).toBeUndefined();
    expect(mappingAfter['.$d']).toBeDefined();
  });
});
