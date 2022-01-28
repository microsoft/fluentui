import { accordionTitleSlotClassNames } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [
    builder => builder.focus(`.${accordionTitleSlotClassNames.contentWrapper}`).snapshot('Focuses the accordion title'),
  ],
};

export default config;
