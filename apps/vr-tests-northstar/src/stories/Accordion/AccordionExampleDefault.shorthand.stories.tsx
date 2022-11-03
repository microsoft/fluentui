import * as React from 'react';
import { Accordion } from '@fluentui/react-northstar';
import { ComponentMeta } from '@storybook/react';

export default {
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

export const AccordionDefaultExample = () => {
  const panels = [
    {
      key: 'a',
      title: 'Sample panel #1',
      content: 'This is a sample of panel #1',
    },
    {
      key: 'b',
      title: 'Sample panel #2',
      content: 'This is a sample of panel #2',
    },
  ];

  return <Accordion defaultActiveIndex={[0]} panels={panels} />;
};
