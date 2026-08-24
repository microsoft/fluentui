export {
  AccordionHeader,
  accordionHeaderClassNames,
  useAccordionHeaderStyles,
} from './components/Accordion/AccordionHeader';
export type {
  AccordionHeaderProps,
  AccordionHeaderSize,
  AccordionHeaderSlots,
  AccordionHeaderState,
} from './components/Accordion/AccordionHeader';

/** Headless building blocks, re-exported for consumers composing their own AccordionHeader. */
export {
  renderAccordionHeader,
  useAccordionHeader,
  useAccordionHeaderContextValues,
} from '@fluentui/react-headless-components-preview/accordion';
