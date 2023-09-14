import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Dropdown, dropdownSlotClassNames, dropdownSelectedItemSlotClassNames } from '@fluentui/react-northstar';
import DropdownExampleMultiple from '../../examples/components/Dropdown/Types/DropdownExampleMultiple.shorthand';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${dropdownSlotClassNames.itemsList} li:nth-child(${itemIndex})`,
  removeItemIcon: (itemIndex: number) =>
    `.${dropdownSlotClassNames.selectedItems} span:nth-child(${itemIndex}) .${dropdownSelectedItemSlotClassNames.icon}`,
};

export default {
  component: Dropdown,
  title: 'Dropdown',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click(selectors.triggerButton)
          .click(selectors.item(3))
          .click(selectors.triggerButton)
          .click(selectors.item(2))
          .click(selectors.triggerButton)
          .snapshot('Opened dropdown with two items selected')
          .click(selectors.removeItemIcon(1))
          .click(selectors.triggerButton)
          .click(selectors.removeItemIcon(1))
          .click(selectors.triggerButton)
          .snapshot('Opened dropdown with no items selected')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

export { DropdownExampleMultiple };
