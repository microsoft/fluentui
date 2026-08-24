export {
  AccordionPanel,
  accordionPanelClassNames,
  useAccordionPanelStyles,
} from './components/Accordion/AccordionPanel';
export type {
  AccordionPanelProps,
  AccordionPanelSlots,
  AccordionPanelState,
} from './components/Accordion/AccordionPanel';

/** Headless building blocks, re-exported for consumers composing their own AccordionPanel. */
export { renderAccordionPanel, useAccordionPanel } from '@fluentui/react-headless-components-preview/accordion';
