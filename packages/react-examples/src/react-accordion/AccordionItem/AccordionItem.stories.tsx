import * as React from 'react';
import { AccordionItem, AccordionHeader, AccordionPanel } from '@fluentui/react-accordion';

export const AccordionItemExample = () => (
  <AccordionItem>
    <AccordionHeader as="h1">Accordion Header</AccordionHeader>
    <AccordionPanel>Accordion Panel</AccordionPanel>
  </AccordionItem>
);
