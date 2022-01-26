import * as React from 'react';
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion } from '../index';

export const Sizes = () => (
  <>
    <Accordion>
      <AccordionItem value="1">
        <AccordionHeader size="small">Accordion Header 1</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 1</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Accordion>
      <AccordionItem value="1">
        <AccordionHeader size="medium">Accordion Header 1</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 1</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Accordion>
      <AccordionItem value="1">
        <AccordionHeader size="large">Accordion Header 1</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 1</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Accordion>
      <AccordionItem value="1">
        <AccordionHeader size="extra-large">Accordion Header 1</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 1</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </>
);

Sizes.parameters = {
  docs: {
    description: {
      story: 'An accordion supports `small`, `medium`, `large` and `extra-large` sizes.',
    },
  },
};
