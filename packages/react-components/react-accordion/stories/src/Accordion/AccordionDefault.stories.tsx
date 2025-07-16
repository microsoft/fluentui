import * as React from 'react';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const Default = () => (
  <Accordion>
    <AccordionItem value="1">
      <AccordionHeader>
        {' '}
        This is a very very very long heading. This is a very very very long heading. This is a very very very long
        heading. This is a very very very long heading.
      </AccordionHeader>
      <AccordionPanel>
        <div>
          {' '}
          This is a very very very long heading. This is a very very very long heading. This is a very very very long
          heading. This is a very very very long heading.
        </div>
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
