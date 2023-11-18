import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { SplitButton, splitButtonToggleClassName } from '@fluentui/react-northstar';
import SplitButtonPositioningExampleShorthand from '../../examples/components/SplitButton/Usage/SplitButtonPositioningExampleShorthand.shorthand';

const selectors = {
  triggerButton: `.${splitButtonToggleClassName}`,
};

export default {
  component: SplitButton,
  title: 'SplitButton',
  decorators: [
    story => (
      <StoryWright steps={new Steps().click(selectors.triggerButton).snapshot('Open menu').end()}>
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof SplitButton>;

export { SplitButtonPositioningExampleShorthand };
