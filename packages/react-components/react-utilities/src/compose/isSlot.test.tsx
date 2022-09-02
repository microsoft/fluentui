import * as React from 'react';
import { isResolvedShorthand } from './isResolvedShorthand';

describe('isResolvedShorthand', () => {
  it('resolves a string', () => {
    expect(isResolvedShorthand('hello')).toEqual(false);
  });

  it('resolves a JSX element', () => {
    expect(isResolvedShorthand(<div>hello</div>)).toEqual(false);
  });

  it('resolves a number', () => {
    expect(isResolvedShorthand(42)).toEqual(false);
  });

  it('resolves null', () => {
    expect(isResolvedShorthand(null)).toEqual(false);
  });

  it('resolves undefined', () => {
    expect(isResolvedShorthand(undefined)).toEqual(false);
  });

  it('resolves object', () => {
    expect(isResolvedShorthand({})).toEqual(true);
  });
  it('resolves array', () => {
    expect(isResolvedShorthand(['1', 2])).toEqual(false);
  });
});
