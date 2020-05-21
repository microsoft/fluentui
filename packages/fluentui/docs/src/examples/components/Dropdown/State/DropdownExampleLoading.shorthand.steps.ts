import { dropdownSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.toggleIndicator}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .click(selectors.triggerButton)
        .snapshot('List with loading state')
        .keys(selectors.triggerButton, keys.downArrow)
        .keys(selectors.triggerButton, keys.downArrow)
        .keys(selectors.triggerButton, keys.downArrow)
        .keys(selectors.triggerButton, keys.downArrow)
        .keys(selectors.triggerButton, keys.downArrow)
        .keys(selectors.triggerButton, keys.downArrow)
        .keys(selectors.triggerButton, keys.downArrow)
        .keys(selectors.triggerButton, keys.downArrow)
        .keys(selectors.triggerButton, keys.downArrow)
        .keys(selectors.triggerButton, keys.downArrow)
        .keys(selectors.triggerButton, keys.downArrow)
        .snapshot('Showing loading in the bottom'),
  ],
};

export default config;
