import { useControllableValue, useId } from '@fluentui/react-utilities';
import * as React from 'react';
import { useAccordionDescendant } from '../Accordion/useAccordionContext';
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
  const [internalOpen, setInternalOpen] = useControllableValue(state.open, state.defaultOpen, state.onToggle);
  const index = useAccordionDescendant({
    element: state.ref.current,
    disabled: state.disabled ?? false,
  });
  const onAccordionHeaderClick = React.useCallback(
    (ev: React.MouseEvent<HTMLElement>) => setInternalOpen(curr => !curr, ev),
    [setInternalOpen],
  );
  const context = React.useMemo<AccordionItemContext>(
    () => ({
      headingId,
      panelId,
      open: internalOpen ?? false,
      onAccordionHeaderClick,
    }),
    [headingId, panelId, internalOpen, onAccordionHeaderClick],
  );
  return context;
}
