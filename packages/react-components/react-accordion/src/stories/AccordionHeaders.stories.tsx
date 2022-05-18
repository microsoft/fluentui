import * as React from 'react';
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion } from '../index';

export const HeadingLevels = () => (
  <Accordion>
    <AccordionItem value="1">
      <AccordionHeader as="h1">Accordion Header as h1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader as="h2">Accordion Header as h2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="3">
      <AccordionHeader as="h3">Accordion Header as h3</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="4">
      <AccordionHeader as="h4">Accordion Header as h4</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 4</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

HeadingLevels.parameters = {
  docs: {
    description: {
      story:
        'An accordion header is a `<div>` by default, but according to [WAI-ARIA specification](https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties), we recommend using a proper heading of any level in markup.',
    },
  },
};
