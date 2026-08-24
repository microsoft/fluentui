export { Accordion, accordionClassNames, useAccordionStyles } from './components/Accordion';
export type { AccordionContextValues, AccordionProps, AccordionSlots, AccordionState } from './components/Accordion';

/** Headless building blocks, re-exported for consumers composing their own Accordion. */
export {
  renderAccordion,
  useAccordion,
  useAccordionContext,
  useAccordionContextValues,
} from '@fluentui/react-headless-components-preview/accordion';
