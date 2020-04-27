import { dropdownSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  clearIndicator: `.${dropdownSlotClassNames.clearIndicator}`,
  triggerButton: `.${dropdownSlotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${dropdownSlotClassNames.itemsList} li:nth-child(${itemIndex})`,
};

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click(selectors.triggerButton)
        .click(selectors.item(3))
        .snapshot('Selects an item')
        .click(selectors.clearIndicator)
        .snapshot('Clears the value'),
  ],
};

export default config;
