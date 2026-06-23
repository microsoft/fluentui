import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import { useMenuButtonBase_unstable } from './useMenuButton';

describe('useMenuButtonBase_unstable', () => {
  it('returns a menuIcon slot by default', () => {
    const { result } = renderHook(() => useMenuButtonBase_unstable({}, React.createRef()));
    expect(result.current.menuIcon).toBeDefined();
  });

  it('forces aria-expanded to a boolean on root', () => {
    const { result } = renderHook(() => useMenuButtonBase_unstable({ 'aria-expanded': 'true' }, React.createRef()));
    expect(result.current.root['aria-expanded']).toBe(true);
  });

  it('does not include appearance/size/shape styling props', () => {
    const { result } = renderHook(() => useMenuButtonBase_unstable({}, React.createRef()));
    expect(result.current).not.toHaveProperty('appearance');
    expect(result.current).not.toHaveProperty('size');
    expect(result.current).not.toHaveProperty('shape');
  });

  it('sets iconOnly true when there are no children', () => {
    const { result } = renderHook(() => useMenuButtonBase_unstable({}, React.createRef()));
    expect(result.current.iconOnly).toBe(true);
  });
});
