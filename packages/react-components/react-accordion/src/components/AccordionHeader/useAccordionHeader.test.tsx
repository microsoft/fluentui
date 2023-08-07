import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useAccordionHeader_unstable } from './useAccordionHeader';
import { AccordionProvider } from '../../contexts/accordion';
import { AccordionItemProvider } from '../../contexts/accordionItem';

describe('useAccordionHeader_unstable', () => {
  it('should return button props as disabled even when it is not disabled (forceDisabled)', () => {
    const ref = React.createRef<HTMLElement>();
    const wrapper: React.FC = ({ children }) => (
      <AccordionProvider
        value={{
          collapsible: false,
          multiple: false,
          navigation: undefined,
          openItems: [1],
          requestToggle: () => {
            /* ... */
          },
        }}
      >
        <AccordionItemProvider
          value={{
            disabled: false,
            open: true,
            value: 1,
          }}
        >
          {children}
        </AccordionItemProvider>
      </AccordionProvider>
    );
    const { result } = renderHook(() => useAccordionHeader_unstable({}, ref), { wrapper });
    expect(result.current.button['aria-disabled']).toBeTruthy();
  });
});
