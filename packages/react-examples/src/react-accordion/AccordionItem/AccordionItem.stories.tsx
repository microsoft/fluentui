import * as React from 'react';
import {
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Accordion,
  AccordionHeaderSize,
  AccordionHeaderExpandIconPosition,
} from '@fluentui/react-accordion';
import { RocketIcon } from '@fluentui/react-icons-mdl2';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface AccordionItemExampleProps {
  icon: boolean;
  size: AccordionHeaderSize;
  expandIconPosition: AccordionHeaderExpandIconPosition;
  onToggle(ev: React.MouseEvent<HTMLElement>, index: number): void;
  label: string;
}

export const AccordionItemExample = (args: AccordionItemExampleProps) => {
  return (
    <Accordion onToggle={args.onToggle} collapsible>
      <AccordionItem>
        <AccordionHeader
          icon={args.icon ? <RocketIcon /> : undefined}
          expandIconPosition={args.expandIconPosition}
          size={args.size}
        >
          {args.label}
        </AccordionHeader>
        <AccordionPanel>Accordion Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
AccordionItemExample.argTypes = {
  onToggle: { action: 'toggled' },
  label: {
    defaultValue: 'Accordion Header',
    type: 'string',
  },
  size: {
    defaultValue: 'medium',
    control: {
      type: 'select',
      options: ['small', 'medium', 'large', 'extra-large'],
    },
  },
  icon: {
    defaultValue: false,
    control: 'boolean',
  },
  expandIconPosition: {
    defaultValue: 'start',
    control: {
      type: 'inline-radio',
      options: ['start', 'end'],
    },
  },
};
