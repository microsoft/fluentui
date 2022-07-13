import * as React from 'react';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const Navigation = () => (
  <Accordion navigation="linear">
    <AccordionItem value="1">
      <AccordionHeader>Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <button>Accordion Panel 1</button>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader>Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <button>Accordion Panel 2</button>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="3">
      <AccordionHeader>Accordion Header 3</AccordionHeader>
      <AccordionPanel>
        <button>Accordion Panel 3</button>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

Navigation.parameters = {
  docs: {
    description: {
      story: 'An accordion supports keyboard navigation.',
    },
  },
};
