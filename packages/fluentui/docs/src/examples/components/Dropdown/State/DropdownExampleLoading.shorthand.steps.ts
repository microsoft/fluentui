import { dropdownSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.toggleIndicator}`,
  itemsList: `.${dropdownSlotClassNames.itemsList}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .click(selectors.triggerButton)
        .snapshot('List with loading state')
        .keys(selectors.itemsList, keys.downArrow)
        .keys(selectors.itemsList, keys.downArrow)
        .keys(selectors.itemsList, keys.downArrow)
        .keys(selectors.itemsList, keys.downArrow)
        .keys(selectors.itemsList, keys.downArrow)
        .keys(selectors.itemsList, keys.downArrow)
        .keys(selectors.itemsList, keys.downArrow)
        .keys(selectors.itemsList, keys.downArrow)
        .keys(selectors.itemsList, keys.downArrow)
        .keys(selectors.itemsList, keys.downArrow)
        .keys(selectors.itemsList, keys.downArrow)
        .snapshot('Showing loading in the bottom'),
  ],
};

export default config;
