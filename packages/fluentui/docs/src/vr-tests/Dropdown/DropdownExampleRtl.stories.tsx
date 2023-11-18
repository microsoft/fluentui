import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Dropdown, dropdownSlotClassNames } from '@fluentui/react-northstar';
import DropdownExampleRtl from '../../examples/components/Dropdown/Rtl/DropdownExample.rtl';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${dropdownSlotClassNames.itemsList} li:nth-child(${itemIndex})`,
};

export default {
  component: Dropdown,
  title: 'Dropdown',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click(selectors.triggerButton)
          .snapshot('RTL: Shows list')
          .click(selectors.item(3))
          .snapshot('RTL: Selects an item')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

export { DropdownExampleRtl };
