import * as React from 'react';
import { getChildMapping } from './getChildMapping';

describe('getChildMapping', () => {
  it('should return an object mapping key to child and index', () => {
    const children = [
      React.createElement('div', { key: 'a' }, 'Hello'),
      React.createElement('div', { key: 'b' }, 'World'),
    ];

    const mapping = getChildMapping(children);

    expect(Object.keys(mapping)).toEqual(['a', 'b']);
    expect(mapping['a'].index).toBe(0);
    expect(mapping['b'].index).toBe(1);
  });

  it('should generate keys for children without explicit keys', () => {
    const children = [
      React.createElement('div', null, 'Hello'),
      React.createElement('div', null, 'World'),
    ];

    const mapping = getChildMapping(children);

    expect(Object.keys(mapping)).toEqual(['.0', '.1']);
    expect(mapping['.0'].index).toBe(0);
    expect(mapping['.1'].index).toBe(1);
  });

  it('should return an empty object if children is null or undefined', () => {
    expect(getChildMapping(null)).toEqual({});
    expect(getChildMapping(undefined)).toEqual({});
  });

  it('should ignore non-element children', () => {
    const children = [
      React.createElement('div', { key: 'a' }, 'Hello'),
      'text node',
      null,
      React.createElement('div', { key: 'b' }, 'World'),
    ];

    const mapping = getChildMapping(children);

    expect(Object.keys(mapping)).toEqual(['a', 'b']);
    expect(mapping['a'].index).toBe(0);
    expect(mapping['b'].index).toBe(1);
  });

  it('should handle children being added', () => {
    const children1 = [React.createElement('div', { key: 'a' }, 'A')];
    const children2 = [
      React.createElement('div', { key: 'a' }, 'A'),
      React.createElement('div', { key: 'b' }, 'B'),
      React.createElement('div', { key: 'c' }, 'C'),
    ];

    const mapping1 = getChildMapping(children1);
    const mapping2 = getChildMapping(children2);

    expect(Object.keys(mapping1)).toEqual(['a']);
    expect(Object.keys(mapping2)).toEqual(['a', 'b', 'c']);
    expect(mapping2['a'].index).toBe(0);
    expect(mapping2['b'].index).toBe(1);
    expect(mapping2['c'].index).toBe(2);
  });

  it('should handle children being removed', () => {
    const children1 = [
      React.createElement('div', { key: 'a' }, 'A'),
      React.createElement('div', { key: 'b' }, 'B'),
      React.createElement('div', { key: 'c' }, 'C'),
    ];
    const children2 = [React.createElement('div', { key: 'b' }, 'B')];

    const mapping1 = getChildMapping(children1);
    const mapping2 = getChildMapping(children2);

    expect(Object.keys(mapping1)).toEqual(['a', 'b', 'c']);
    expect(Object.keys(mapping2)).toEqual(['b']);
    expect(mapping2['b'].index).toBe(0);
  });

  it('should handle children being reordered', () => {
    const children1 = [
      React.createElement('div', { key: 'a' }, 'A'),
      React.createElement('div', { key: 'b' }, 'B'),
      React.createElement('div', { key: 'c' }, 'C'),
    ];
    const children2 = [
      React.createElement('div', { key: 'c' }, 'C'),
      React.createElement('div', { key: 'a' }, 'A'),
      React.createElement('div', { key: 'b' }, 'B'),
    ];

    const mapping1 = getChildMapping(children1);
    const mapping2 = getChildMapping(children2);

    expect(mapping1['a'].index).toBe(0);
    expect(mapping1['b'].index).toBe(1);
    expect(mapping1['c'].index).toBe(2);

    expect(mapping2['c'].index).toBe(0);
    expect(mapping2['a'].index).toBe(1);
    expect(mapping2['b'].index).toBe(2);
  });

  it('should handle simultaneous add and remove', () => {
    const children1 = [
      React.createElement('div', { key: 'a' }, 'A'),
      React.createElement('div', { key: 'b' }, 'B'),
    ];
    const children2 = [
      React.createElement('div', { key: 'b' }, 'B'),
      React.createElement('div', { key: 'c' }, 'C'),
    ];

    const mapping1 = getChildMapping(children1);
    const mapping2 = getChildMapping(children2);

    // Same count (2 items), but different items
    expect(Object.keys(mapping1).length).toBe(2);
    expect(Object.keys(mapping2).length).toBe(2);

    // Item 'a' removed, item 'c' added
    expect('a' in mapping1).toBe(true);
    expect('a' in mapping2).toBe(false);
    expect('c' in mapping1).toBe(false);
    expect('c' in mapping2).toBe(true);

    // Item 'b' persists but changes index
    expect(mapping1['b'].index).toBe(1);
    expect(mapping2['b'].index).toBe(0);
  });
});
