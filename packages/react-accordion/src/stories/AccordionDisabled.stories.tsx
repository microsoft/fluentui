import * as React from 'react';
import {
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Accordion,
  AccordionItemProps,
  // https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from '@fluentui/react-accordion';

export const Disabled = (args: AccordionItemProps) => (
  <Accordion>
    <AccordionItem {...args} value="1">
      <AccordionHeader>Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem {...args} value="2">
      <AccordionHeader>Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem {...args} value="3">
      <AccordionHeader>Accordion Header 3</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

Disabled.args = {
  disabled: true,
} as AccordionItemProps;

Disabled.parameters = {
  docs: {
    description: {
      story: 'An Accordion Item can be `disabled`',
    },
  },
};
