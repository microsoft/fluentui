import * as React from 'react';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-headless-components-preview';
import { ChevronRightRegular } from '@fluentui/react-icons';

const items = [
  { value: 'item-1', header: 'Accordion Header 1', panel: 'Accordion Panel 1' },
  { value: 'item-2', header: 'Accordion Header 2', panel: 'Accordion Panel 2' },
  { value: 'item-3', header: 'Accordion Header 3', panel: 'Accordion Panel 3' },
];

export const Collapsible = (): React.ReactNode => (
  <Accordion className="flex w-full max-w-96 flex-col justify-center text-gray-900" collapsible>
    {items.map(item => (
      <AccordionItem className="group border-b border-gray-200 last:border-b-0" key={item.value} value={item.value}>
        <AccordionHeader
          button={{
            className:
              'border-none relative flex w-full items-baseline gap-3 py-2 px-3 text-left font-semibold hover:bg-gray-50 focus-visible:z-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
          }}
          expandIcon={<ChevronRightRegular className="group-data-[open]:rotate-90 transition-transform" />}
        >
          {item.header}
        </AccordionHeader>
        <AccordionPanel className="group-data-[open]:h-max overflow-hidden text-base text-gray-600 transition-[height] ease-out h-0">
          <div className="p-3">{item.panel}</div>
        </AccordionPanel>
      </AccordionItem>
    ))}
  </Accordion>
);
