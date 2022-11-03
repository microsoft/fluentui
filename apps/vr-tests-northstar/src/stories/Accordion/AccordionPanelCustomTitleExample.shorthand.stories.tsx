import * as React from 'react';
import { Accordion, Label, Layout, accordionTitleSlotClassNames } from '@fluentui/react-northstar';
import { ErrorIcon } from '@fluentui/react-icons-northstar';
import Screener from 'screener-storybook/src/screener';
import { ComponentMeta } from '@storybook/react';

const steps = new Screener.Steps()
  .focus(`.${accordionTitleSlotClassNames.contentWrapper}`)
  .snapshot('Focuses the accordion title')
  .end();

export default {
  decorators: [story => <Screener steps={steps}> {story()}</Screener>],
} as ComponentMeta<typeof Accordion>;

export const AccordionPanelCustomTitleExample = () => {
  const panels = [
    {
      title: (
        <Layout key="title" start={<Label icon={<ErrorIcon />} iconPosition="start" circular content="Warnings" />} />
      ),
      content: {
        key: 'warnings',
        content: 'Here is a list of warnings discovered.',
      },
    },
  ];

  return <Accordion defaultActiveIndex={[0]} panels={panels} />;
};
