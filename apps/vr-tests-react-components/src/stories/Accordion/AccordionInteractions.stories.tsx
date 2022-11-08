import * as React from 'react';
import { Accordion, Provider, accordionTitleSlotClassNames, teamsTheme } from '@fluentui/react-northstar';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import AccordionExampleCustomTitle from '../../examples/components/Accordion/Visual/AccordionExampleCustomTitle.shorthand';

export default {
  component: Accordion,
  title: 'Accordion',
  decorators: [
    story => <Provider theme={teamsTheme}>{story()}</Provider>,
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
