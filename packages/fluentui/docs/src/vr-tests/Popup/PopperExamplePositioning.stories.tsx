import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Popup } from '@fluentui/react-northstar';
import PopperExamplePositioning from '../../examples/components/Popup/Visual/PopperExamplePositioning';

export default {
  component: Popup,
  title: 'Popup',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps() // A popper can't be opened in visual tests by default as it makes { StoryWright } results unstable
          // because of 1px shift on different renders
          .click('#open-popper')
          .snapshot('Opened on Box A (default position)')
          .click('#use-boxB')
          .snapshot('Opened on Box B (default position)')
          .click('#align-end-position-above')
          .snapshot('Opened on Box B (align: end, position: above)')
          .click('#use-boxA')
          .snapshot('Opened on Box A (align: end, position: above)')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Popup>;

export { PopperExamplePositioning };
