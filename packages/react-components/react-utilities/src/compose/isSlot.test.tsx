import * as React from 'react';
import { isSlot } from './isSlot';

describe('isSlot', () => {
  it('resolves a string', () => {
    expect(isSlot('hello')).toEqual(false);
  });

  it('resolves a JSX element', () => {
    expect(isSlot(<div>hello</div>)).toEqual(false);
  });

  it('resolves a number', () => {
    expect(isSlot(42)).toEqual(false);
  });

  it('resolves null', () => {
    expect(isSlot(null)).toEqual(false);
  });

  it('resolves undefined', () => {
    expect(isSlot(undefined)).toEqual(false);
  });

  it('resolves object', () => {
    expect(isSlot({})).toEqual(true);
  });
});
