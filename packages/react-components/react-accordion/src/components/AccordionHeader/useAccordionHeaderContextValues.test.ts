import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useAccordionHeader_unstable } from './useAccordionHeader';
import { useAccordionHeaderContextValues_unstable } from './useAccordionHeaderContextValues';

describe('useAccordionHeaderContextValues_unstable', () => {
  it('should return a value for "accordionHeader"', () => {
    const { result } = renderHook(() => {
      const state = useAccordionHeader_unstable({}, React.createRef());

      return useAccordionHeaderContextValues_unstable(state);
    });

    expect(result.current.accordionHeader).toBeDefined();
    expect(result.current.accordionHeader.disabled).toBe(false);
    expect(result.current.accordionHeader.expandIconPosition).toBe('start');
    expect(result.current.accordionHeader.open).toBe(false);
    expect(result.current.accordionHeader.size).toBe('medium');
  });
});
