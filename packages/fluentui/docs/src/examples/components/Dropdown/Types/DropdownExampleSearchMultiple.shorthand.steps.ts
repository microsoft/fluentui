import { dropdownSearchInputSlotClassNames, dropdownSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  toggleIndicator: `.${dropdownSlotClassNames.toggleIndicator}`,
  input: `.${dropdownSearchInputSlotClassNames.input}`,
  item: (itemIndex: number) => `.${dropdownSlotClassNames.itemsList} li:nth-child(${itemIndex})`,
  selectedItem: (itemIndex: number) => `.${dropdownSlotClassNames.selectedItems} span:nth-child(${itemIndex})`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .click(selectors.toggleIndicator)
        .click(selectors.item(2))
        .click(selectors.toggleIndicator)
        .click(selectors.item(2))
        .keys(selectors.input, keys.leftArrow)
        .snapshot('Selects last selected element')
        .hover(selectors.selectedItem(1))
        .snapshot('Hovers first selected element'),
  ],
};

export default config;
