import { Dropdown, buttonClassName } from '@fluentui/react-northstar';

const selectors = {
  toggleIndicator: `.${Dropdown.slotClassNames.toggleIndicator}`,
  item: (itemIndex: number) => `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
  popupTrigger: `.${buttonClassName}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(selectors.popupTrigger)
        .click(selectors.toggleIndicator)
        .hover(selectors.item(2))
        .snapshot('Prepares to select item out of popup.')
        .click(selectors.item(2))
        .snapshot('Item should be selected.'),
  ],
};

export default config;
