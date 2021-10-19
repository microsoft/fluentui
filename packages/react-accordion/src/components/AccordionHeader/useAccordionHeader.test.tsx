import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useAccordionHeader } from './useAccordionHeader';
import { AccordionContext } from '../Accordion/AccordionContext';
import { AccordionItemContext } from '../AccordionItem/AccordionItemContext';

describe('useAccordionHeader', () => {
  it('should return button props as disabled even when it is not disabled (forceDisabled)', () => {
    const ref = React.createRef<HTMLElement>();
    const wrapper: React.FC = ({ children }) => (
      <AccordionContext.Provider
        value={{
          collapsible: false,
          navigable: false,
          openItems: [1],
          requestToggle: () => {
            /* ... */
          },
        }}
      >
        <AccordionItemContext.Provider
          value={{
            disabled: false,
            open: true,
            onHeaderClick: () => {
              /* ... */
            },
          }}
        >
          {children}
        </AccordionItemContext.Provider>
      </AccordionContext.Provider>
    );
    const { result } = renderHook(() => useAccordionHeader({}, ref), { wrapper });
    expect(result.current.button['aria-disabled']).toBeTruthy();
  });
});
