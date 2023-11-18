import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useAccordionItem_unstable } from './useAccordionItem';
import { useAccordionItemContextValues_unstable } from './useAccordionItemContextValues';

describe('useAccordionContextValues_unstable', () => {
  it('should return a value for "accordion"', () => {
    const { result } = renderHook(() => {
      const state = useAccordionItem_unstable({ value: 'foo' }, React.createRef());

      return useAccordionItemContextValues_unstable(state);
    });

    expect(result.current.accordionItem).toBeDefined();
    expect(result.current.accordionItem.disabled).toBe(false);
    expect(result.current.accordionItem.open).toBe(false);
    expect(result.current.accordionItem.value).toBe('foo');
  });
});
