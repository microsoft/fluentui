export { Accordion, accordionClassNames, useAccordionStyles } from './components/Accordion';
export type { AccordionContextValues, AccordionProps, AccordionSlots, AccordionState } from './components/Accordion';

export { AccordionHeader, accordionHeaderClassNames, useAccordionHeaderStyles } from './components/AccordionHeader';
export type {
  AccordionHeaderProps,
  AccordionHeaderSize,
  AccordionHeaderSlots,
  AccordionHeaderState,
} from './components/AccordionHeader';

export { AccordionItem, accordionItemClassNames, useAccordionItemStyles } from './components/AccordionItem';
export type { AccordionItemProps, AccordionItemSlots, AccordionItemState } from './components/AccordionItem';

export { AccordionPanel, accordionPanelClassNames, useAccordionPanelStyles } from './components/AccordionPanel';
export type { AccordionPanelProps, AccordionPanelSlots, AccordionPanelState } from './components/AccordionPanel';

/** Headless building blocks, re-exported for consumers composing their own Accordion. */
export {
  renderAccordion,
  renderAccordionHeader,
  renderAccordionItem,
  renderAccordionPanel,
  useAccordion,
  useAccordionContext,
  useAccordionContextValues,
  useAccordionHeader,
  useAccordionHeaderContextValues,
  useAccordionItem,
  useAccordionItemContextValues,
  useAccordionPanel,
} from '@fluentui/react-headless-components-preview/accordion';
