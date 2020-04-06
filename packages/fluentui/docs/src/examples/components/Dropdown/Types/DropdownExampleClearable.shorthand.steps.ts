import { Dropdown } from '@fluentui/react-northstar';

const selectors = {
  clearIndicator: `.${Dropdown.slotClassNames.clearIndicator}`,
  triggerButton: `.${Dropdown.slotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
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
