import { ChatMessage } from '@fluentui/react-northstar';

const selectors = {
  message: `.${ChatMessage.className}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses last message'),
    (builder, keys) =>
      builder
        .click(selectors.message)
        .keys(selectors.message, keys.downArrow)
        .snapshot('Focuses second message'),
  ],
};

export default config;
