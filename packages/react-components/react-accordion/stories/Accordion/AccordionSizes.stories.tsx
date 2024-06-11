import * as React from 'react';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const Sizes = () => (
  <>
    <Accordion collapsible>
      <AccordionItem value="1">
        <AccordionHeader size="small">Small Header</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Accordion collapsible>
      <AccordionItem value="1">
        <AccordionHeader size="medium">Medium Header</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Accordion collapsible>
      <AccordionItem value="1">
        <AccordionHeader size="large">Large Header</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Accordion collapsible>
      <AccordionItem value="1">
        <AccordionHeader size="extra-large">Extra-Large Header</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </>
);

Sizes.parameters = {
  docs: {
    description: {
      story: 'AccordionHeader supports `small`, `medium`, `large` and `extra-large` sizes.',
    },
  },
};
