import { Dropdown, DropdownSearchInput } from '@fluentui/react-northstar';

const selectors = {
  triggerButton: `.${Dropdown.slotClassNames.triggerButton}`,
  input: `.${DropdownSearchInput.slotClassNames.input}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder => builder.hover(selectors.triggerButton).snapshot('Mouse hover on trigger'),
    builder => builder.hover(selectors.input).snapshot('Mouse hover on input'),
  ],
};

export default config;
