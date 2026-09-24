import * as React from 'react';
import type { JSXElement, AccordionToggleEventHandler } from '@fluentui/react-components';
import { AddFilled, SubtractFilled } from '@fluentui/react-icons';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const ExpandIcon = (): JSXElement => {
  const [openItem, setOpenItems] = React.useState(0);
  const handleToggle = React.useCallback<AccordionToggleEventHandler>((_, data) => {
    setOpenItems(data.value as number);
  }, []);
  return (
    <Accordion onToggle={handleToggle} openItems={openItem}>
      <AccordionItem value={1}>
        <AccordionHeader expandIcon={openItem === 1 ? <SubtractFilled fontSize={20} /> : <AddFilled fontSize={20} />}>
          Accordion Header 1
        </AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 1</div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value={2}>
        <AccordionHeader expandIcon={openItem === 2 ? <SubtractFilled fontSize={20} /> : <AddFilled fontSize={20} />}>
          Accordion Header 2
        </AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 2</div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value={3}>
        <AccordionHeader expandIcon={openItem === 3 ? <SubtractFilled fontSize={20} /> : <AddFilled fontSize={20} />}>
          Accordion Header 3
        </AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 3</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

ExpandIcon.parameters = {
  docs: {
    description: {
      story: 'An accordion item can have a custom expand icon.',
    },
  },
};
