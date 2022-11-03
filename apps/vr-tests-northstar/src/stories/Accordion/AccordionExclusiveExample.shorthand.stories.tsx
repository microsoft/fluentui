import * as React from 'react';
import { Accordion } from '@fluentui/react-northstar';
import { ComponentMeta } from '@storybook/react';

export default {
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const panels = [
  {
    key: 'one',
    title: 'One',
    content: '2 3 4',
  },
  {
    key: 'two',
    title: 'Five',
    content: '6 7 8 9',
  },
  {
    key: 'three',
    title: "What's next?",
    content: '10',
  },
];

export const AccordionExclusiveExample = () => <Accordion panels={panels} exclusive />;
