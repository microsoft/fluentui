import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useMenuList } from './useMenuList';
import { useMenuListContextValues } from './useMenuListContextValues';

describe('useMenuListContextValues', () => {
  it('should return a value for "menuList"', () => {
    const { result } = renderHook(() => {
      const state = useMenuList({}, React.createRef());

      return useMenuListContextValues(state);
    });

    expect(result.current.menuList).toBeDefined();
  });
});
