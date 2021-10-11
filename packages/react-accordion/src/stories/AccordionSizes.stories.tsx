import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion } from '@fluentui/react-accordion';

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
      story: 'A Accordion can support `small`, `medium`, `large` and `extra-larger` sizes.',
    },
  },
};
