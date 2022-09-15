import * as React from 'react';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const ExpandIconPosition = () => (
  <Accordion>
    <AccordionItem value="1">
      <AccordionHeader expandIconPosition="end">Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader expandIconPosition="start">Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

ExpandIconPosition.parameters = {
  docs: {
    description: {
      story: 'The expand icon can be placed at the `start` or `end` of the accordian header.',
    },
  },
};
