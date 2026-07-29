import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useNavSubItemGroup_unstable } from './useNavSubItemGroup';
import { NavCategoryProvider } from '../NavCategoryContext';
import type { NavCategoryContextValue } from '../NavCategoryContext';

const createCategoryContextValue = (overrides?: Partial<NavCategoryContextValue>): NavCategoryContextValue => ({
  open: true,
  value: 'category-1',
  ...overrides,
});

describe('useNavSubItemGroup_unstable', () => {
  it('reads open state from NavCategory context', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavCategoryProvider value={createCategoryContextValue({ open: false })}>{children}</NavCategoryProvider>
    );

    const { result } = renderHook(() => useNavSubItemGroup_unstable({}, React.createRef()), { wrapper });

    expect(result.current.open).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components.root).toBe('div');
  });

  it('configures collapseMotion visibility based on open state', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <NavCategoryProvider value={createCategoryContextValue({ open: true })}>{children}</NavCategoryProvider>
    );

    const { result } = renderHook(() => useNavSubItemGroup_unstable({}, React.createRef()), { wrapper });

    expect(result.current.collapseMotion).toBeDefined();
    expect((result.current.collapseMotion as unknown as Record<string, unknown>).visible).toBe(true);
  });
});
