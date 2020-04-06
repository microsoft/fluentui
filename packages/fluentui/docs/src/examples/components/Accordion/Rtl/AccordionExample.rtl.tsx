import * as React from 'react';
import { Accordion } from '@fluentui/react-northstar';

const panels = [
  {
    key: 'first',
    title: 'مرحبا العالم',
    content: 'مرحبا العالم',
  },
  {
    key: 'second',
    title: 'مرحبا المريخ',
    content: 'مرحبا المريخ',
  },
];

const AccordionExampleRtl = () => <Accordion defaultActiveIndex={[0]} panels={panels} />;

export default AccordionExampleRtl;
