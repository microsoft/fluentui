import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useMenuGroup } from './useMenuGroup';
import { useMenuGroupContextValues } from './useMenuGroupContextValues';

describe('useMenuGroupContextValues', () => {
  it('should return a value for "menuGroup"', () => {
    const { result } = renderHook(() => {
      const state = useMenuGroup({}, React.createRef());

      return useMenuGroupContextValues(state);
    });

    expect(result.current.menuGroup).toBeDefined();
    expect(typeof result.current.menuGroup.headerId).toBe('string');
  });
});
