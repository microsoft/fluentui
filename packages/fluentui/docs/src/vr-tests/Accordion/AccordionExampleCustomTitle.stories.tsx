import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Accordion, accordionTitleSlotClassNames } from '@fluentui/react-northstar';
import AccordionExampleCustomTitle from '../../examples/components/Accordion/Visual/AccordionExampleCustomTitle.shorthand';

export default {
  component: Accordion,
  title: 'Accordion',
  decorators: [
    story => (
      <Screener
        steps={new Steps()
          .focus(`.${accordionTitleSlotClassNames.contentWrapper}`)
          .snapshot('Focuses the accordion title')
          .end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Accordion>;

export { AccordionExampleCustomTitle };
