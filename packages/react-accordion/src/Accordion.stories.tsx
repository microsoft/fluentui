import * as React from 'react';
import { RocketIcon } from './icons.stories';
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion } from './index';
import type { AccordionProps } from './index';
import type { ArgType } from '@storybook/addons';
import type { AccordionHeaderProps } from './components/AccordionHeader/AccordionHeader.types';

interface AccordionExampleProps
  extends AccordionProps,
    Pick<AccordionHeaderProps, 'icon' | 'inline' | 'size' | 'expandIconPosition'> {}

export const AccordionExample = ({ icon, inline, size, expandIconPosition, ...props }: AccordionExampleProps) => {
  return (
    <>
      <Accordion {...props}>
        <AccordionItem value="1">
          <AccordionHeader
            inline={inline}
            size={size}
            expandIconPosition={expandIconPosition}
            icon={icon ? <RocketIcon /> : undefined}
          >
            Accordion Header 1
          </AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 1</div>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionHeader
            inline={inline}
            size={size}
            expandIconPosition={expandIconPosition}
            icon={icon ? <RocketIcon /> : undefined}
          >
            Accordion Header 2
          </AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 2</div>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionHeader
            inline={inline}
            size={size}
            expandIconPosition={expandIconPosition}
            icon={icon ? <RocketIcon /> : undefined}
          >
            Accordion Header 3
          </AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 3</div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
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
  as: {
    control: false,
  },
  index: {
    control: false,
  },
  defaultIndex: {
    control: false,
  },
  expandIconPosition: {
    defaultValue: 'start',
    control: {
      type: 'inline-radio',
      options: ['start', 'end'],
    },
  },
} as { [K in keyof (AccordionProps | AccordionHeaderProps)]: ArgType };

export default {
  title: 'Components/Accordion',
  component: Accordion,
};
