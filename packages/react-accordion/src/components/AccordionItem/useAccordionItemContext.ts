import * as React from 'react';
import { useAccordionDescendant, AccordionContext } from '../Accordion/useAccordionContext';
import { AccordionItemContextValue, AccordionItemState } from './AccordionItem.types';
import { useContextSelector } from '@fluentui/react-context-selector';

// No default value.
export const AccordionItemContext = React.createContext<AccordionItemContextValue>({
  onHeaderClick() {
    /** */
  },
  open: false,
  disabled: false,
});

export const useAccordionItemContext = () => React.useContext(AccordionItemContext);

/**
 * Creates internal context to be consumed by AccordionHeader and AccordionPanel
 */
export function useCreateAccordionItemContextValue(
  state: Pick<AccordionItemState, 'disabled'>,
  ref: React.RefObject<HTMLElement>,
) {
  // index -1 means context not provided
  const index = useAccordionDescendant({
    element: ref.current,
    disabled: state.disabled,
  });
  const requestToggle = useContextSelector(AccordionContext, ctx => ctx.requestToggle);
  const open = useContextSelector(AccordionContext, ctx => ctx.openItems.includes(index));
  const onAccordionHeaderClick = React.useCallback(
    (ev: React.MouseEvent | React.KeyboardEvent) => requestToggle(ev, index),
    [requestToggle, index],
  );
  const context = React.useMemo<AccordionItemContextValue>(
    () => ({
      open,
      onHeaderClick: onAccordionHeaderClick,
      disabled: state.disabled,
    }),
    [onAccordionHeaderClick, open, state.disabled],
  );
  return context;
}
