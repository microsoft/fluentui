import { toolbarMenuItemClassName, toolbarItemWrapperClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${toolbarItemWrapperClassName} button`)
        .snapshot('Shows menu')
        .click(`.${toolbarMenuItemClassName}:nth-child(1)`)
        .snapshot('Shows popup'),
  ],
};

export default config;
