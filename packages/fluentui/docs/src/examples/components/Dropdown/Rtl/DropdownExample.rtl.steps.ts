import { dropdownSlotClassNames } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@uifabric/build/screener';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${dropdownSlotClassNames.itemsList} li:nth-child(${itemIndex})`,
};

export const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click(selectors.triggerButton)
        .snapshot('RTL: Shows list')
        .click(selectors.item(3))
        .snapshot('RTL: Selects an item'),
  ],
};

export default config;
