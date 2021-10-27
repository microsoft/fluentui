import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useAccordion } from './useAccordion';
import { useAccordionContextValues } from './useAccordionContextValues';

describe('useAccordionContextValues', () => {
  it('should return a value for "accordion"', () => {
    const { result } = renderHook(() => {
      const state = useAccordion({ navigable: false }, React.createRef());

      return useAccordionContextValues(state);
    });

    expect(result.current.accordion).toBeDefined();
    expect(result.current.accordion.navigable).toBe(false);
    expect(result.current.accordion.openItems).toBeInstanceOf(Array);
    expect(result.current.accordion.requestToggle).toBeInstanceOf(Function);
  });
});
