import { Reaction, chatMessageSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  chatMessageContent: `.${chatMessageSlotClassNames.content}`,
  reaction: `.${Reaction.deprecated_className}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder => builder.click(selectors.reaction).snapshot('Clicks the first reaction'),
    (builder, keys) => builder.keys(selectors.reaction, keys.tab).snapshot('Set focus on the second reaction'),
  ],
};

export default config;
