import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useMenuList_unstable } from './useMenuList';
import { useMenuListContextValues_unstable } from './useMenuListContextValues';

describe('useMenuListContextValues_unstable', () => {
  it('should return a value for "menuList"', () => {
    const { result } = renderHook(() => {
      const state = useMenuList_unstable({}, React.createRef());

      return useMenuListContextValues_unstable(state);
    });

    expect(result.current.menuList).toBeDefined();
  });
});
