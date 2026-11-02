import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useAppItemStatic_unstable } from './useAppItemStatic';
import { NavProvider } from '../NavContext';
import type { NavContextValue } from '../NavContext.types';

const defaultNavContextValue: NavContextValue = {
  selectedValue: undefined,
  selectedCategoryValue: undefined,
  onRegister: () => undefined,
  onUnregister: () => undefined,
  onSelect: () => undefined,
  getRegisteredNavItems: () => ({ registeredNavItems: {} }),
  onRequestNavCategoryItemToggle: () => undefined,
  openCategories: [],
  multiple: true,
  density: 'small',
  tabbable: false,
};

describe('useAppItemStatic_unstable', () => {
  it('creates a div root and optional icon slot', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavProvider value={defaultNavContextValue}>{children}</NavProvider>
    );

    const { result } = renderHook(() => useAppItemStatic_unstable({ icon: 'icon' }, React.createRef()), { wrapper });

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components.root).toBe('div');
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components.icon).toBe('span');
    expect(result.current.icon).toBeDefined();
  });

  it('inherits density from Nav context', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavProvider value={defaultNavContextValue}>{children}</NavProvider>
    );

    const { result } = renderHook(() => useAppItemStatic_unstable({}, React.createRef()), { wrapper });

    expect(result.current.density).toBe('small');
  });
});
