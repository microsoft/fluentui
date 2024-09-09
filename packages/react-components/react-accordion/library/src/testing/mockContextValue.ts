import type { AccordionContextValue } from '../contexts/accordion';
import type { AccordionItemContextValue } from '../contexts/accordionItem';

export function mockAccordionContextValue(partialValue?: Partial<AccordionContextValue>): AccordionContextValue {
  return {
    collapsible: false,
    multiple: false,
    navigation: undefined,
    openItems: [],
    requestToggle() {
      /* noop */
    },
    ...partialValue,
  };
}

export function mockAccordionItemContextValue(
  partialValue?: Partial<AccordionItemContextValue>,
): AccordionItemContextValue {
  return {
    open: false,
    disabled: false,
    value: undefined,
    onHeaderClick() {
      /* noop */
    },
    ...partialValue,
  };
}
