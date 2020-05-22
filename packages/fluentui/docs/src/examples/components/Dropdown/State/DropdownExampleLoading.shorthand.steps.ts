import { dropdownSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.toggleIndicator}`,
  item: index => `.${dropdownSlotClassNames.item}:nth-of-type(${index})`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .click(selectors.triggerButton)
        .snapshot('List with loading state')
        .focus(selectors.item(10))
        .keys(selectors.item(10), keys.downArrow)
        .snapshot('Dropdown: showing loading in the bottom'),
  ],
};

export default config;
