import { useId } from '@fluentui/react-utilities';
import * as React from 'react';
import { useAccordionContext, useAccordionDescendant } from '../Accordion/useAccordionContext';
import { AccordionItemContext, AccordionItemState } from './AccordionItem.types';

// No default value.
export const accordionItemContext = React.createContext<AccordionItemContext>(undefined!);

export function useAccordionItemContext() {
  const context = React.useContext(accordionItemContext);
  if (context === undefined) {
    throw new Error(`${useAccordionItemContext.name} should be used inside an AccordionItem element`);
  }
  return context;
}

export function useCreateAccordionItemContext(state: AccordionItemState) {
  const headingId = useId('accordion-item-heading-');
  const panelId = useId('accordion-item-panel-');
  const { requestToggle, openItems } = useAccordionContext();
  // index -1 means context not provided
  const index = useAccordionDescendant({
    element: state.ref.current,
    disabled: state.disabled ?? false,
  });
  const open = React.useMemo(
    () => (index === -1 ? false : Array.isArray(openItems) ? openItems.includes(index) : openItems === index),
    [openItems, index],
  );
  const onAccordionHeaderClick = React.useCallback((ev: React.MouseEvent<HTMLElement>) => requestToggle(ev, index), [
    requestToggle,
    index,
  ]);
  const context = React.useMemo<AccordionItemContext>(
    () => ({
      headingId,
      panelId,
      open,
      onAccordionHeaderClick,
    }),
    [headingId, panelId, onAccordionHeaderClick, open],
  );
  return context;
}
