import * as React from 'react';
import {
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Accordion,
  AccordionHeaderSize,
  AccordionHeaderExpandIconPosition,
} from '@fluentui/react-accordion';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface AccordionItemExampleProps {
  size: AccordionHeaderSize;
  expandIconPosition: AccordionHeaderExpandIconPosition;
  onToggle(index: number): void;
  label: string;
}

export const AccordionItemExample = (args: AccordionItemExampleProps) => {
  return (
    <Accordion onToggle={args.onToggle} collapsible>
      <AccordionItem>
        <AccordionHeader expandIconPosition={args.expandIconPosition} size={args.size}>
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
  expandIconPosition: {
    defaultValue: 'start',
    control: {
      type: 'inline-radio',
      options: ['start', 'end'],
    },
  },
};
