import * as React from 'react';
import { Accordion } from '@fluentui/react-northstar';
import { ComponentMeta } from '@storybook/react';

export default {
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const panels = [
  {
    title: { key: 'rtl-content-1', content: 'مرحبا العالم' },
    content: 'مرحبا العالم',
  },
  {
    title: { key: 'rtl-content-2', content: 'مرحبا المريخ' },
    content: 'مرحبا المريخ',
  },
];

export const AccordionExampleRtl = () => <Accordion defaultActiveIndex={[0]} panels={panels} />;
