import * as React from 'react';
import { RocketRegular } from '@fluentui/react-icons';

import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const WithIcon = () => (
  <Accordion>
    <AccordionItem value="1">
      <AccordionHeader icon={<RocketRegular />}>Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader icon={<RocketRegular />}>Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="3">
      <AccordionHeader icon={<RocketRegular />}>Accordion Header 3</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

WithIcon.parameters = {
  docs: {
    description: {
      story: 'An accordion header can contain an icon.',
    },
  },
};
