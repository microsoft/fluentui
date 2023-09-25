import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useMenuGroup_unstable } from './useMenuGroup';
import { useMenuGroupContextValues_unstable } from './useMenuGroupContextValues';

describe('useMenuGroupContextValues_unstable', () => {
  it('should return a value for "menuGroup"', () => {
    const { result } = renderHook(() => {
      const state = useMenuGroup_unstable({}, React.createRef());

      return useMenuGroupContextValues_unstable(state);
    });

    expect(result.current.menuGroup).toBeDefined();
    expect(typeof result.current.menuGroup.headerId).toBe('string');
  });
});
