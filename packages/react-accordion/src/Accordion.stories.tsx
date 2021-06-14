import * as React from 'react';
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion, AccordionProps } from './index';
import { ArgType } from '@storybook/addons';
import { RocketIcon } from './icons.stories';

export const AccordionExample = (props: AccordionProps) => {
  return (
    <Accordion {...props} icon={props.icon ? <RocketIcon /> : undefined}>
      <AccordionItem>
        <AccordionHeader>Accordion Header 1</AccordionHeader>
        <AccordionPanel>
          <div>
            <button>Button 1</button>
          </div>
          <div>Accordion Panel 1</div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Accordion Header 2</AccordionHeader>
        <AccordionPanel>
          <div>
            <button>Button 2</button>
          </div>
          <div>Accordion Panel 2</div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Accordion Header 3</AccordionHeader>
        <AccordionPanel>
          <div>
            <button>Button 3</button>
          </div>
          <div>Accordion Panel 3</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
AccordionExample.argTypes = {
  inline: {
    defaultValue: false,
    control: 'boolean',
  },
  navigable: {
    defaultValue: false,
    control: 'boolean',
  },
  circular: {
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

export default {
  title: 'Components/Accordion',
  component: Accordion,
};
