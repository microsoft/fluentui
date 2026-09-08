import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useNavSubItem_unstable } from './useNavSubItem';
import { NavProvider } from '../NavContext';
import type { NavContextValue } from '../NavContext.types';
import { NavCategoryProvider } from '../NavCategoryContext';
import type { NavCategoryContextValue } from '../NavCategoryContext';

const createNavContextValue = (overrides?: Partial<NavContextValue>): NavContextValue => ({
  selectedValue: 'sub-item-1',
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

const createCategoryContextValue = (overrides?: Partial<NavCategoryContextValue>): NavCategoryContextValue => ({
  open: true,
  value: 'category-1',
  ...overrides,
});

describe('useNavSubItem_unstable', () => {
  it('marks sub item selected when selectedValue matches', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavProvider value={createNavContextValue()}>
        <NavCategoryProvider value={createCategoryContextValue()}>{children}</NavCategoryProvider>
      </NavProvider>
    );

    const { result } = renderHook(() => useNavSubItem_unstable({ value: 'sub-item-1' }, React.createRef()), {
      wrapper,
    });

    expect(result.current.selected).toBe(true);
    expect(result.current.root['aria-current']).toBe('page');
  });

  it('calls onSelect with parent category value when clicked', () => {
    const onSelect = jest.fn();
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavProvider value={createNavContextValue({ selectedValue: undefined, onSelect })}>
        <NavCategoryProvider value={createCategoryContextValue({ value: 'category-2' })}>
          {children}
        </NavCategoryProvider>
      </NavProvider>
    );

    const { result } = renderHook(() => useNavSubItem_unstable({ value: 'sub-item-2' }, React.createRef()), {
      wrapper,
    });

    act(() => {
      result.current.root.onClick?.({
        target: document.createElement('button'),
        defaultPrevented: false,
      } as unknown as React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLAnchorElement>);
    });

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ value: 'sub-item-2', categoryValue: 'category-2' }),
    );
  });

  it('registers and unregisters by sub item value', () => {
    const onRegister = jest.fn();
    const onUnregister = jest.fn();
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavProvider value={createNavContextValue({ onRegister, onUnregister })}>
        <NavCategoryProvider value={createCategoryContextValue()}>{children}</NavCategoryProvider>
      </NavProvider>
    );

    const { unmount } = renderHook(() => useNavSubItem_unstable({ value: 'sub-item-3' }, React.createRef()), {
      wrapper,
    });

    expect(onRegister).toHaveBeenCalledTimes(1);
    unmount();
    expect(onUnregister).toHaveBeenCalledTimes(1);
  });
});
