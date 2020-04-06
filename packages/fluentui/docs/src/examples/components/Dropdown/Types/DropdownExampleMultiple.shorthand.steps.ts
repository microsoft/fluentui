import { Dropdown, DropdownSelectedItem } from '@fluentui/react-northstar';

const selectors = {
  triggerButton: `.${Dropdown.slotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
  removeItemIcon: (itemIndex: number) =>
    `.${Dropdown.slotClassNames.selectedItems} span:nth-child(${itemIndex}) .${DropdownSelectedItem.slotClassNames.icon}`,
};

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
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
        .snapshot('Opened dropdown with no items selected'),
  ],
};

export default config;
