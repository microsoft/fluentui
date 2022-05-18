import * as React from 'react';
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion, AccordionProps } from '../index';

export const OpenItems = (args: AccordionProps) => (
  <Accordion defaultOpenItems="1" {...args}>
    <AccordionItem value="1">
      <AccordionHeader>Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader>Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="3">
      <AccordionHeader>Accordion Header 3</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

OpenItems.args = {
  openItems: ['1'],
} as AccordionProps;

OpenItems.parameters = {
  docs: {
    description: {
      story:
        'An accordion can have defined open items. If no open item is present, all panels will be closed by default',
    },
  },
};
