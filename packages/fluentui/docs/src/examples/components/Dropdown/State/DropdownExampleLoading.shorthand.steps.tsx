import { dropdownSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.triggerButton}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [builder => builder.click(selectors.triggerButton).snapshot('List with loading state')],
};

export default config;
