import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useNavCategoryItem_unstable } from './useNavCategoryItem';
import { NavProvider } from '../NavContext';
import type { NavContextValue } from '../NavContext.types';
import { NavCategoryProvider } from '../NavCategoryContext';
import type { NavCategoryContextValue } from '../NavCategoryContext';

const createNavContextValue = (overrides?: Partial<NavContextValue>): NavContextValue => ({
  selectedValue: undefined,
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
  open: false,
  value: 'category-1',
  ...overrides,
});

describe('useNavCategoryItem_unstable', () => {
  it('is selected and sets aria-current when closed with matching selectedCategoryValue', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavProvider value={createNavContextValue({ selectedCategoryValue: 'category-1' })}>
        <NavCategoryProvider value={createCategoryContextValue()}>{children}</NavCategoryProvider>
      </NavProvider>
    );

    const { result } = renderHook(() => useNavCategoryItem_unstable({}, React.createRef()), { wrapper });

    expect(result.current.selected).toBe(true);
    expect(result.current.root['aria-current']).toBe('page');
    expect(result.current.root['aria-expanded']).toBe(false);
  });

  it('does not mark selected while open even if selectedCategoryValue matches', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavProvider value={createNavContextValue({ selectedCategoryValue: 'category-1' })}>
        <NavCategoryProvider value={createCategoryContextValue({ open: true })}>{children}</NavCategoryProvider>
      </NavProvider>
    );

    const { result } = renderHook(() => useNavCategoryItem_unstable({}, React.createRef()), { wrapper });

    expect(result.current.selected).toBe(false);
    expect(result.current.root['aria-current']).toBe('false');
    expect(result.current.root['aria-expanded']).toBe(true);
  });

  it('requests category toggle on click', () => {
    const onRequestNavCategoryItemToggle = jest.fn();
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavProvider value={createNavContextValue({ onRequestNavCategoryItemToggle })}>
        <NavCategoryProvider value={createCategoryContextValue({ value: 'category-2' })}>
          {children}
        </NavCategoryProvider>
      </NavProvider>
    );

    const { result } = renderHook(() => useNavCategoryItem_unstable({}, React.createRef()), { wrapper });

    act(() => {
      result.current.root.onClick?.({} as React.MouseEvent<HTMLButtonElement>);
    });

    expect(onRequestNavCategoryItemToggle).toHaveBeenCalledTimes(1);
    expect(onRequestNavCategoryItemToggle).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ categoryValue: 'category-2', value: '' }),
    );
  });
});
