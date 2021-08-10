import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useMenu } from './useMenu';
import { useMenuContextValues } from './useMenuContextValues';

describe('useAccordionContextValues', () => {
  it('should return a value for "menu"', () => {
    const { result } = renderHook(() => {
      const state = useMenu({ children: <span /> });

      return useMenuContextValues(state);
    });

    expect(result.current.menu).toBeDefined();
  });
});
