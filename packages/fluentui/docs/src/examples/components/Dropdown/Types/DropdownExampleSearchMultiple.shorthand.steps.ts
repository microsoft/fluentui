import { Dropdown, DropdownSearchInput } from '@fluentui/react-northstar';

const selectors = {
  toggleIndicator: `.${Dropdown.slotClassNames.toggleIndicator}`,
  input: `.${DropdownSearchInput.slotClassNames.input}`,
  item: (itemIndex: number) => `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
  selectedItem: (itemIndex: number) => `.${Dropdown.slotClassNames.selectedItems} span:nth-child(${itemIndex})`,
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
