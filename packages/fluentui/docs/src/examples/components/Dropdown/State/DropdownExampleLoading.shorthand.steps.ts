import { Dropdown } from '@fluentui/react-northstar';

const selectors = {
  triggerButton: `.${Dropdown.slotClassNames.toggleIndicator}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [builder => builder.click(selectors.triggerButton).snapshot('List with loading state')],
};

export default config;
