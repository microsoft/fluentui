import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useAccordionItem } from './useAccordionItem';
import { useAccordionItemContextValues } from './useAccordionItemContextValues';

describe('useAccordionContextValues', () => {
  it('should return a value for "accordion"', () => {
    const { result } = renderHook(() => {
      const state = useAccordionItem({ value: 'foo' }, React.createRef());

      return useAccordionItemContextValues(state);
    });

    expect(result.current.accordionItem).toBeDefined();
    expect(result.current.accordionItem.disabled).toBe(false);
    expect(result.current.accordionItem.open).toBe(false);
    expect(result.current.accordionItem.onHeaderClick).toBeInstanceOf(Function);
  });
});
