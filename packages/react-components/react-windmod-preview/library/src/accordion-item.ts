export { AccordionItem, accordionItemClassNames, useAccordionItemStyles } from './components/Accordion/AccordionItem';
export type { AccordionItemProps, AccordionItemSlots, AccordionItemState } from './components/Accordion/AccordionItem';

/** Headless building blocks, re-exported for consumers composing their own AccordionItem. */
export {
  renderAccordionItem,
  useAccordionItem,
  useAccordionItemContextValues,
} from '@fluentui/react-headless-components-preview/accordion';
