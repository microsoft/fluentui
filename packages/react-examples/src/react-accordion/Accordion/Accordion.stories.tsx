import * as React from 'react';
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion, AccordionProps } from '@fluentui/react-accordion';
import { ArgType } from '@storybook/addons';
import { RocketIcon } from '@fluentui/react-icons-mdl2';

export const AccordionExample = (props: AccordionProps) => {
  return (
    <Accordion {...props} icon={props.icon ? <RocketIcon /> : undefined}>
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
  inline: {
    defaultValue: false,
    control: 'boolean',
  },
  multiple: {
    defaultValue: false,
    control: 'boolean',
  },
  collapsible: {
    defaultValue: false,
    control: 'boolean',
  },
  icon: {
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
