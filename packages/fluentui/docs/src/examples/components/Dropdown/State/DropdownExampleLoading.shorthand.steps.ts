import { dropdownSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.toggleIndicator}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [builder => builder.click(selectors.triggerButton).snapshot('List with loading state')],
  browsers: ['ie11'],
};

export default config;
