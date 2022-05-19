import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useAccordion_unstable } from './useAccordion';
import { useAccordionContextValues_unstable } from './useAccordionContextValues';

describe('useAccordionContextValues_unstable', () => {
  it('should return a value for "accordion"', () => {
    const { result } = renderHook(() => {
      const state = useAccordion_unstable({}, React.createRef());

      return useAccordionContextValues_unstable(state);
    });

    expect(result.current.accordion).toBeDefined();
    expect(result.current.accordion.navigation).toBe(undefined);
    expect(result.current.accordion.openItems).toBeInstanceOf(Array);
    expect(result.current.accordion.requestToggle).toBeInstanceOf(Function);
  });
});
