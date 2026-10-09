import type {
  AccordionPanelProps as AccordionPanelHeadlessProps,
  AccordionPanelState as AccordionPanelHeadlessState,
} from '@fluentui/react-headless-components-preview/accordion';

export type { AccordionPanelSlots } from '@fluentui/react-headless-components-preview/accordion';

/** Windmod AccordionPanel props. The headless surface carries every prop; windmod adds no look props. */
export type AccordionPanelProps = AccordionPanelHeadlessProps;

/** Windmod AccordionPanel state. */
export type AccordionPanelState = AccordionPanelHeadlessState;
