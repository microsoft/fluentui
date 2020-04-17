import * as React from 'react';
import { Accordion } from '@fluentui/react-northstar';

const panels = [
  {
    key: 'content-1',
    title: 'مرحبا العالم مرحبًا',
    content: 'مرحبا العالم',
  },
  {
    key: 'content-2',
    title: 'مرحبا المريخ مرحبًا',
    content: 'مرحبا المريخ',
  },
];

const AccordionExampleRtl = () => <Accordion defaultActiveIndex={[0]} panels={panels} />;

export default AccordionExampleRtl;
