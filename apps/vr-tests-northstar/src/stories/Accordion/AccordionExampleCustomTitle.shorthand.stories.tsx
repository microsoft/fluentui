import * as React from 'react';
import { Accordion, Label, Layout } from '@fluentui/react-northstar';
import { ComponentMeta } from '@storybook/react';

export default {
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

export const AccordionExampleCustomTitle = () => {
  const panels = [
    {
      title: {
        key: 't',
        content: <Layout key="title" start={<Label iconPosition="start" circular content="Sample" />} />,
      },
      content: {
        key: 'sample1',
        content: 'Sample of the content.',
      },
    },
  ];

  return <Accordion defaultActiveIndex={[0]} panels={panels} />;
};
