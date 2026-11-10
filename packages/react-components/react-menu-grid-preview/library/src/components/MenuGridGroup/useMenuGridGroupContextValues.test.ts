import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useMenuGridGroup_unstable } from './useMenuGridGroup';
import { useMenuGridGroupContextValues_unstable } from './useMenuGridGroupContextValues';

describe('useMenuGridGroupContextValues_unstable', () => {
  it('should return a value for "menuGridGroup"', () => {
    const { result } = renderHook(() => {
      const state = useMenuGridGroup_unstable({}, React.createRef());

      return useMenuGridGroupContextValues_unstable(state);
    });

    expect(result.current.menuGridGroup).toBeDefined();
    expect(typeof result.current.menuGridGroup.headerId).toBe('string');
  });
});
