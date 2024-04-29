import * as React from 'react';
import { Accordion } from '@fluentui/react-northstar';

const panels = [
  {
    key: 'one',
    title: `You can't close this panel`,
    content: 'But you can try.',
  },
  {
    key: 'two',
    title: 'Undless you open this panel',
    content: 'Told you so.',
  },
  {
    key: 'three',
    title: 'Or this one',
    content: 'So many choices...',
  },
];

const AccordionExclusiveExpandedExample = () => <Accordion panels={panels} exclusive expanded />;

export default AccordionExclusiveExpandedExample;
