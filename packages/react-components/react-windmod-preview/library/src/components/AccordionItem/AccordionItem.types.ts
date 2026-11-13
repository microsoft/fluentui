import type {
  AccordionItemProps as AccordionItemHeadlessProps,
  AccordionItemState as AccordionItemHeadlessState,
} from '@fluentui/react-headless-components-preview/accordion';

export type { AccordionItemSlots } from '@fluentui/react-headless-components-preview/accordion';

/** Windmod AccordionItem props. The headless surface carries every prop; windmod adds no look props. */
export type AccordionItemProps = AccordionItemHeadlessProps;

/** Windmod AccordionItem state. */
export type AccordionItemState = AccordionItemHeadlessState;
