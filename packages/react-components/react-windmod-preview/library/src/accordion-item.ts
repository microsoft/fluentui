export { AccordionItem, accordionItemClassNames, useAccordionItemStyles } from './components/AccordionItem';
export type { AccordionItemProps, AccordionItemSlots, AccordionItemState } from './components/AccordionItem';

/** Headless building blocks, re-exported for consumers composing their own AccordionItem. */
export {
  renderAccordionItem,
  useAccordionItem,
  useAccordionItemContextValues,
} from '@fluentui/react-headless-components-preview/accordion';
