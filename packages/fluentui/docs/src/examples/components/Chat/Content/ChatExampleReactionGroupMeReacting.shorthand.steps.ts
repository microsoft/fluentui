import { ScreenerTestsConfig } from '@uifabric/build/screener';
import { reactionClassName, chatMessageSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  chatMessageContent: `.${chatMessageSlotClassNames.content}`,
  reaction: `.${reactionClassName}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder => builder.click(selectors.reaction).snapshot('Clicks the first reaction'),
    (builder, keys) => builder.keys(selectors.reaction, keys.tab).snapshot('Set focus on the second reaction'),
  ],
};

export default config;
