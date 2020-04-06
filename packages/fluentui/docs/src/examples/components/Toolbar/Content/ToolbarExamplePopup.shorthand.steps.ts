import { ToolbarItem } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${ToolbarItem.className}:nth-child(1)`)
        .snapshot('Shows first popup')
        .click(`.${ToolbarItem.className}:nth-child(2)`)
        .snapshot('Shows second popup'),
  ],
};

export default config;
