import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Popup, buttonClassName } from '@fluentui/react-northstar';
import PopupExampleOffset from '../../examples/components/Popup/Variations/PopupExampleOffset.shorthand';

const selectors = {
  trigger: `.${buttonClassName}`,
};

export default {
  component: Popup,
  title: 'Popup',
  decorators: [
    story => (
      <StoryWright steps={new Steps().click(selectors.trigger).snapshot('Opens a popup').end()}>{story()}</StoryWright>
    ),
  ],
} as ComponentMeta<typeof Popup>;

export { PopupExampleOffset };
