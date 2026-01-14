import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useMenuGrid_unstable } from './useMenuGrid';
import { useMenuGridContextValues_unstable } from './useMenuGridContextValues';

describe('useMenuGridContextValues_unstable', () => {
  it('should return a value for "menuGrid"', () => {
    const { result } = renderHook(() => {
      const state = useMenuGrid_unstable({}, React.createRef());

      return useMenuGridContextValues_unstable(state);
    });

    expect(result.current.menuGrid).toBeDefined();
    expect(typeof result.current.menuGrid.tableRowTabsterAttribute).toBe('object');
  });
});
