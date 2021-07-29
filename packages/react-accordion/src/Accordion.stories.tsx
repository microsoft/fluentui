import * as React from 'react';
import { RocketIcon } from './icons.stories';
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion, AccordionProps } from './index';
import { ArgType } from '@storybook/addons';
import { AccordionHeaderProps } from './components/AccordionHeader/AccordionHeader.types';

interface AccordionExampleProps
  extends AccordionProps,
    Pick<AccordionHeaderProps, 'icon' | 'inline' | 'size' | 'expandIconPosition'> {}

export const AccordionExample = ({ icon, inline, size, expandIconPosition, ...props }: AccordionExampleProps) => {
  const items = [
    <AccordionItem key="1">
      <AccordionHeader
        inline={inline}
        size={size}
        expandIconPosition={expandIconPosition}
        icon={icon ? <RocketIcon /> : undefined}
      >
        Accordion Header 1
      </AccordionHeader>
      <AccordionPanel>
        <button onClick={() => setShuffledItems(shuffle(items))}>shuffle</button>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>,
    <AccordionItem key="2">
      <AccordionHeader
        inline={inline}
        size={size}
        expandIconPosition={expandIconPosition}
        icon={icon ? <RocketIcon /> : undefined}
      >
        Accordion Header 2
      </AccordionHeader>
      <AccordionPanel>
        <button onClick={() => setShuffledItems(shuffle(items))}>shuffle</button>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>,
    <AccordionItem key="3">
      <AccordionHeader
        inline={inline}
        size={size}
        expandIconPosition={expandIconPosition}
        icon={icon ? <RocketIcon /> : undefined}
      >
        Accordion Header 3
      </AccordionHeader>
      <AccordionPanel>
        <button onClick={() => setShuffledItems(shuffle(items))}>shuffle</button>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>,
  ];

  const [shuffledItems, setShuffledItems] = React.useState(items);

  return (
    <>
      <Accordion {...props}>{shuffledItems}</Accordion>
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

function shuffle<T>(array: T[]) {
  let currentIndex = array.length;
  let randomIndex: number;
  const nextArray: T[] = Array.from(array);

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [nextArray[currentIndex], nextArray[randomIndex]] = [nextArray[randomIndex], nextArray[currentIndex]];
  }

  return nextArray;
}
