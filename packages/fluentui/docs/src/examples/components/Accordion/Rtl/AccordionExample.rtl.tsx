import * as React from 'react';
import { Accordion } from '@fluentui/react-northstar';

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

const AccordionExampleRtl = () => <Accordion defaultActiveIndex={[0]} panels={panels} />;

export default AccordionExampleRtl;
