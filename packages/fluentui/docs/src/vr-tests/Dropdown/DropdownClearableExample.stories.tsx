import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Dropdown, dropdownSlotClassNames } from '@fluentui/react-northstar';
import DropdownClearableExample from '../../examples/components/Dropdown/Types/DropdownExampleClearable.shorthand';

const selectors = {
  clearIndicator: `.${dropdownSlotClassNames.clearIndicator}`,
  triggerButton: `.${dropdownSlotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${dropdownSlotClassNames.itemsList} li:nth-child(${itemIndex})`,
};

const steps = new Steps()
  .click(selectors.triggerButton)
  .click(selectors.item(3))
  .snapshot('Selects an item')
  .click(selectors.clearIndicator)
  .snapshot('Clears the value')
  .end();

export default {
  component: Dropdown,
  title: 'Dropdown',
  decorators: [story => <Screener steps={steps}>{story()}</Screener>],
} as ComponentMeta<typeof Dropdown>;

export { DropdownClearableExample };
