import * as React from 'react';
import { isSlot } from './isSlot';
import * as slot from './slot';

describe('isSlot', () => {
  it('handles a string', () => {
    expect(isSlot('hello')).toEqual(false);
  });

  it('handles a JSX element', () => {
    expect(isSlot(<div>hello</div>)).toEqual(false);
  });

  it('handles a number', () => {
    expect(isSlot(42)).toEqual(false);
  });

  it('handles null', () => {
    expect(isSlot(null)).toEqual(false);
  });

  it('handles undefined', () => {
    expect(isSlot(undefined)).toEqual(false);
  });

  it('handles object', () => {
    expect(isSlot({})).toEqual(false);
  });

  it('handles array', () => {
    expect(isSlot(['1', 2])).toEqual(false);
  });

  it('handles actual slot', () => {
    expect(isSlot(slot.optional({}, { elementType: 'div' }))).toEqual(true);
  });

  it('handles slots created with a different instance of react-utilities', async () => {
    jest.isolateModules(() => {
      const otherSlot = require('./slot') as typeof slot;
      expect(isSlot(otherSlot.optional({}, { elementType: 'div' }))).toBeTruthy();
    });
  });
});
