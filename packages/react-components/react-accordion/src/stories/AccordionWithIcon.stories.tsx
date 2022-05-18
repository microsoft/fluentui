import * as React from 'react';
import { RocketRegular as RocketIcon } from '@fluentui/react-icons';

import { AccordionItem, AccordionHeader, AccordionPanel, Accordion, AccordionHeaderProps } from '../index';

export const WithIcon = (args: AccordionHeaderProps) => (
  <Accordion>
    <AccordionItem value="1">
      <AccordionHeader {...args}>Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader {...args}>Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="3">
      <AccordionHeader {...args}>Accordion Header 3</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

WithIcon.args = {
  icon: <RocketIcon />,
} as AccordionHeaderProps;

WithIcon.parameters = {
  docs: {
    description: {
      story: 'An accordion header can contain an icon.',
    },
  },
};
