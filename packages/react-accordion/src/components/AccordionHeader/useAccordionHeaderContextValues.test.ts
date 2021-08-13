import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useAccordionHeader } from './useAccordionHeader';
import { useAccordionHeaderContextValues } from './useAccordionHeaderContextValues';

describe('useAccordionHeaderContextValues', () => {
  it('should return a value for "accordionHeader"', () => {
    const { result } = renderHook(() => {
      const state = useAccordionHeader({}, React.createRef());

      return useAccordionHeaderContextValues(state);
    });

    expect(result.current.accordionHeader).toBeDefined();
    expect(result.current.accordionHeader.disabled).toBe(false);
    expect(result.current.accordionHeader.expandIconPosition).toBe('start');
    expect(result.current.accordionHeader.open).toBe(false);
    expect(result.current.accordionHeader.size).toBe('medium');
  });
});
