import * as React from 'react';
import type { JSXElement } from '@fluentui/react-headless-components-preview';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-headless-components-preview';
import { ChevronRightRegular } from '@fluentui/react-icons';

const items = [
  { value: 'item-1', header: 'Accordion Header 1', panel: 'Accordion Panel 1' },
  { value: 'item-2', header: 'Accordion Header 2', panel: 'Accordion Panel 2' },
  { value: 'item-3', header: 'Accordion Header 3', panel: 'Accordion Panel 3' },
];

export const Default = (): JSXElement => (
  <Accordion className="flex w-full max-w-96 flex-col justify-center text-gray-900 border border-gray-200 rounded-md">
    {items.map(item => (
      <AccordionItem className="group border-b border-gray-200" key={item.value} value={item.value}>
        <AccordionHeader
          button={{
            className:
              'border-none relative flex w-full items-baseline gap-3 bg-gray-100 py-2 px-3 text-left font-semibold hover:bg-gray-200 focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-blue-500',
          }}
          expandIcon={<ChevronRightRegular className="group-data-[open]:rotate-90 transition-transform" />}
        >
          {item.header}
        </AccordionHeader>
        <AccordionPanel className="group-data-[open]:h-max overflow-hidden text-base text-gray-600 transition-[height] ease-out h-0 px-3">
          {item.panel}
        </AccordionPanel>
      </AccordionItem>
    ))}
  </Accordion>
);
