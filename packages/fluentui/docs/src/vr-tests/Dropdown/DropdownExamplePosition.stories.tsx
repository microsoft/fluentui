import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { Meta } from '@storybook/react';
import { Dropdown, dropdownSlotClassNames } from '@fluentui/react-northstar';
import DropdownExamplePosition from '../../examples/components/Dropdown/Variations/DropdownExampleOffset.shorthand';

const selectors = {
  trigger: `.${dropdownSlotClassNames.triggerButton}`,
};

export default {
  component: Dropdown,
  title: 'Dropdown',
  decorators: [
    story => (
      <StoryWright steps={new Steps().click(selectors.trigger).snapshot('Opens a dropdown').end()}>
        {story()}
      </StoryWright>
    ),
  ],
} as Meta<typeof Dropdown>;

export { DropdownExamplePosition };
