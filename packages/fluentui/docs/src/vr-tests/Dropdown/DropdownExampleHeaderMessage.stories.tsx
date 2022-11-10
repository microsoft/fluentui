import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
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
      <Screener steps={new Steps().click(selectors.triggerButton).snapshot('Shows header message').end()}>
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

export { DropdownExampleHeaderMessage };
