// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  renderAccordion,
  renderAccordionHeader,
  renderAccordionItem,
  renderAccordionPanel,
  useAccordion,
  useAccordionContext,
  useAccordionContextValues,
  useAccordionHeader,
  useAccordionHeaderContext,
  useAccordionHeaderContextValues,
  useAccordionItem,
  useAccordionItemContext,
  useAccordionItemContextValues,
  useAccordionPanel,
} from '@fluentui/react-headless-components-preview/accordion';

console.log(
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  renderAccordion,
  renderAccordionHeader,
  renderAccordionItem,
  renderAccordionPanel,
  useAccordion,
  useAccordionContext,
  useAccordionContextValues,
  useAccordionHeader,
  useAccordionHeaderContext,
  useAccordionHeaderContextValues,
  useAccordionItem,
  useAccordionItemContext,
  useAccordionItemContextValues,
  useAccordionPanel,
);

export default {
  name: '@fluentui/react-headless-components-preview/accordion',
};
