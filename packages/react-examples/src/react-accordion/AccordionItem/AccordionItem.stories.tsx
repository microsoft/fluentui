import * as React from 'react';
import {
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Accordion,
  AccordionHeaderSize,
  AccordionHeaderExpandIconPosition,
} from '@fluentui/react-accordion';
import { ChevronRightIcon, ChevronDownIcon } from '@fluentui/react-icons-mdl2';

const ExpandIcon = ({ open, ...rest }: { open: boolean }) => {
  return open ? <ChevronDownIcon {...rest} /> : <ChevronRightIcon {...rest} />;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
interface AccordionItemExampleProps {
  size: AccordionHeaderSize;
  expandIconPosition: AccordionHeaderExpandIconPosition;
  onToggle(index: number): void;
}

export const AccordionItemExample = (args: AccordionItemExampleProps) => {
  return (
    <Accordion onToggle={args.onToggle} collapsible>
      <AccordionItem>
        <AccordionHeader expandIconPosition={args.expandIconPosition} size={args.size} expandIcon={{ as: ExpandIcon }}>
          Accordion Header
        </AccordionHeader>
        <AccordionPanel style={{ padding: 50 }}>Accordion Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
AccordionItemExample.argTypes = {
  onToggle: { action: 'toggled' },
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
