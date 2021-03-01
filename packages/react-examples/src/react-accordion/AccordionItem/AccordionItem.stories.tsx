import * as React from 'react';
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion } from '@fluentui/react-accordion';

export const AccordionItemExample = () => {
  return (
    <Accordion multiple collapsible>
      <AccordionItem>
        <AccordionHeader>Accordion Header</AccordionHeader>
        <AccordionPanel>Accordion Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Accordion Header</AccordionHeader>
        <AccordionPanel>Accordion Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
