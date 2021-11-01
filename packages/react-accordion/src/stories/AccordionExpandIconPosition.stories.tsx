import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion } from '@fluentui/react-accordion';

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
      story: 'The Expand Icon can be placed at the `start` or `end`',
    },
  },
};
