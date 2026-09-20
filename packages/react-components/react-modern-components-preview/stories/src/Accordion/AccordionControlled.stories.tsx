import * as React from 'react';
import type { AccordionProps } from '@fluentui/react-modern-components-preview/accordion';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '@fluentui/react-modern-components-preview/accordion';

export const Controlled = (): React.ReactNode => {
  const [openItems, setOpenItems] = React.useState(['1']);
  const handleToggle: NonNullable<AccordionProps['onToggle']> = (event, data) => {
    setOpenItems(data.openItems as string[]);
  };
  return (
    <Accordion openItems={openItems} onToggle={handleToggle} multiple collapsible>
      <AccordionItem value="1">
        <AccordionHeader>Accordion Header 1</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 1</div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionHeader>Accordion Header 2</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 2</div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="3">
        <AccordionHeader>Accordion Header 3</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 3</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story:
        'An accordion can be controlled, to ensure `multiple` and `collapsible` you should use `openItems` provided through `onToggle` callback.',
    },
  },
};
