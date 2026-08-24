import type {
  AccordionProps as AccordionHeadlessProps,
  AccordionState as AccordionHeadlessState,
} from '@fluentui/react-headless-components-preview/accordion';

export type { AccordionContextValues, AccordionSlots } from '@fluentui/react-headless-components-preview/accordion';

/** Windmod Accordion props. The headless surface carries every prop; windmod adds no look props. */
export type AccordionProps = AccordionHeadlessProps;

/** Windmod Accordion state. */
export type AccordionState = AccordionHeadlessState;
