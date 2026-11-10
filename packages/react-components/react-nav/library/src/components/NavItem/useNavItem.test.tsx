import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useNavItem_unstable } from './useNavItem';
import { NavProvider } from '../NavContext';
import type { NavContextValue } from '../NavContext.types';

const createNavContextValue = (overrides?: Partial<NavContextValue>): NavContextValue => ({
  selectedValue: 'item-1',
  selectedCategoryValue: undefined,
  onRegister: () => undefined,
  onUnregister: () => undefined,
  onSelect: () => undefined,
  getRegisteredNavItems: () => ({ registeredNavItems: {} }),
  onRequestNavCategoryItemToggle: () => undefined,
  openCategories: [],
  multiple: true,
  density: 'medium',
  tabbable: false,
  ...overrides,
});

describe('useNavItem_unstable', () => {
  it('marks the item as selected when selectedValue matches', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavProvider value={createNavContextValue()}>{children}</NavProvider>
    );

    const { result } = renderHook(() => useNavItem_unstable({ value: 'item-1' }, React.createRef()), { wrapper });

    expect(result.current.selected).toBe(true);
    expect(result.current.root['aria-current']).toBe('page');
  });

  it('calls onSelect with value when clicked and not prevented', () => {
    const onSelect = jest.fn();
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavProvider value={createNavContextValue({ selectedValue: undefined, onSelect })}>{children}</NavProvider>
    );

    const { result } = renderHook(() => useNavItem_unstable({ value: 'item-2' }, React.createRef()), { wrapper });

    act(() => {
      result.current.root.onClick?.({
        target: document.createElement('button'),
        defaultPrevented: false,
      } as unknown as React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLAnchorElement>);
    });

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ value: 'item-2', type: 'click' }),
    );
  });

  it('registers on mount and unregisters on unmount', () => {
    const onRegister = jest.fn();
    const onUnregister = jest.fn();
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavProvider value={createNavContextValue({ onRegister, onUnregister })}>{children}</NavProvider>
    );

    const { unmount } = renderHook(() => useNavItem_unstable({ value: 'item-1' }, React.createRef()), { wrapper });

    expect(onRegister).toHaveBeenCalledTimes(1);
    unmount();
    expect(onUnregister).toHaveBeenCalledTimes(1);
  });
});
