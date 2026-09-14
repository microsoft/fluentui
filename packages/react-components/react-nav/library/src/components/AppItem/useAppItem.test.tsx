import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useAppItem_unstable } from './useAppItem';
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

describe('useAppItem_unstable', () => {
  it('uses an anchor root when href is provided', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavProvider value={defaultNavContextValue}>{children}</NavProvider>
    );

    const { result } = renderHook(() => useAppItem_unstable({ href: '/app' }, React.createRef()), { wrapper });

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components.root).toBe('a');
  });

  it('inherits density from Nav context', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavProvider value={defaultNavContextValue}>{children}</NavProvider>
    );

    const { result } = renderHook(() => useAppItem_unstable({}, React.createRef()), { wrapper });

    expect(result.current.density).toBe('small');
  });
});
