import * as React from 'react';
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion, AccordionProps } from '../index';

export const Multiple = (args: AccordionProps) => (
  <Accordion {...args}>
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

Multiple.args = {
  multiple: true,
} as AccordionProps;

Multiple.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line @fluentui/max-len
        "An accordion supports multiple panels expanded simultaneously. Since it's not simple to determine which panel will be opened by default, `multiple` will also be collapsed by default on the first render",
    },
  },
};
