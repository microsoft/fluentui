import * as React from 'react';
import { Provider, Accordion, teamsTheme } from '@fluentui/react-northstar';
import { ComponentMeta } from '@storybook/react';

export default {
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const panels = [
  {
    key: 'p',
    title: 'What is a point?',
    content: 'Use the haptic SDD circuit, then you can index the redundant pixel!',
  },
  {
    key: 'd',
    title: 'What is a dimension of a point?',
    content: 'We need to copy the primary USB firewall!',
  },
];

export const AccordionDefaultBsize = () => (
  <Provider theme={teamsTheme}>
    <Accordion defaultActiveIndex={[0]} panels={panels} />
  </Provider>
);
