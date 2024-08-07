import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { Meta } from '@storybook/react';
import { Dropdown, dropdownSlotClassNames } from '@fluentui/react-northstar';
import DropdownExampleHeaderMessage from '../../examples/components/Dropdown/Slots/DropdownExampleHeaderMessage.shorthand';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.triggerButton}`,
};

export default {
  component: Dropdown,
  title: 'Dropdown',
  decorators: [
    story => (
      <StoryWright steps={new Steps().click(selectors.triggerButton).snapshot('Shows header message').end()}>
        {story()}
      </StoryWright>
    ),
  ],
} as Meta<typeof Dropdown>;

export { DropdownExampleHeaderMessage };
