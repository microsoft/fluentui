import { dropdownSlotClassNames, dropdownSelectedItemSlotClassNames } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@uifabric/build/screener';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${dropdownSlotClassNames.itemsList} li:nth-child(${itemIndex})`,
  removeItemIcon: (itemIndex: number) =>
    `.${dropdownSlotClassNames.selectedItems} span:nth-child(${itemIndex}) .${dropdownSelectedItemSlotClassNames.icon}`,
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
