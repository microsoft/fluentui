import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import { useMenuButtonBase_unstable } from './useMenuButton';

describe('useMenuButtonBase_unstable', () => {
  it('does not render the menuIcon slot when none is provided', () => {
    const { result } = renderHook(() => useMenuButtonBase_unstable({}, React.createRef()));
    expect(result.current.menuIcon).toBeUndefined();
  });

  it('renders the menuIcon slot only when one is provided, shipping no default icon', () => {
    const customIcon = <span data-testid="custom-menu-icon" />;
    const { result } = renderHook(() =>
      useMenuButtonBase_unstable({ menuIcon: { children: customIcon } }, React.createRef()),
    );
    expect(result.current.menuIcon).toBeDefined();
    expect(result.current.menuIcon?.children).toBe(customIcon);
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
