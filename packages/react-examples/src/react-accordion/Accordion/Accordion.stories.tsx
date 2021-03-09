import * as React from 'react';
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion, AccordionProps } from '@fluentui/react-accordion';
import { ArgType } from '@storybook/addons';

export const AccordionExample = (props: AccordionProps) => {
  return (
    <Accordion {...props}>
      <AccordionItem>
        <AccordionHeader>Accordion Header 1</AccordionHeader>
        <AccordionPanel>Accordion Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Accordion Header 2</AccordionHeader>
        <AccordionPanel>Accordion Panel 2</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Accordion Header 3</AccordionHeader>
        <AccordionPanel>Accordion Panel 3</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
AccordionExample.argTypes = {
  multiple: {
    defaultValue: false,
    control: 'boolean',
  },
  collapsible: {
    defaultValue: false,
    control: 'boolean',
  },
  size: {
    defaultValue: 'medium',
    control: {
      type: 'select',
      options: ['small', 'medium', 'large', 'extra-large'],
    },
  },
  expandIconPosition: {
    defaultValue: 'start',
    control: {
      type: 'inline-radio',
      options: ['start', 'end'],
    },
  },
} as { [K in keyof AccordionProps]: ArgType };
