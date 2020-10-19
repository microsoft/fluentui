import { dropdownSlotClassNames, buttonClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@uifabric/build/screener';

const selectors = {
  toggleIndicator: `.${dropdownSlotClassNames.toggleIndicator}`,
  item: (itemIndex: number) => `.${dropdownSlotClassNames.itemsList} li:nth-child(${itemIndex})`,
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

        // A hack to load images properly in Screener
        .wait(500)

        .snapshot('Prepares to select item out of popup.')
        .click(selectors.item(2))
        .snapshot('Item should be selected.'),
  ],
};

export default config;
