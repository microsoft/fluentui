import { useId } from '@fluentui/react-utilities';
import * as React from 'react';
import { useAccordionContext, useAccordionDescendant } from '../Accordion/useAccordionContext';
import { AccordionItemContext, AccordionItemState } from './AccordionItem.types';

// No default value.
export const accordionItemContext = React.createContext<AccordionItemContext>({
  headingId: '',
  panelId: '',
  onAccordionHeaderClick() {
    /** */
  },
  open: false,
});

export const useAccordionItemContext = () => React.useContext(accordionItemContext);

/**
 * Creates internal context to be consumed by AccordionHeader and AccordionPanel
 */
export function useCreateAccordionItemContext(state: AccordionItemState) {
  const headingId = useId('accordion-item-heading-');
  const panelId = useId('accordion-item-panel-');
  const { requestToggle, openItems } = useAccordionContext();
  // index -1 means context not provided
  const index = useAccordionDescendant({
    element: state.ref.current,
    disabled: state.disabled ?? false,
  });
  const open = React.useMemo(() => openItems.includes(index), [openItems, index]);
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
