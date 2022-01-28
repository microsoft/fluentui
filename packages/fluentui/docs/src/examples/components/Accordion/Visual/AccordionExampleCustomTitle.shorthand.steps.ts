import { accordionTitleSlotClassNames } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [
    builder => builder.hover(`.${accordionTitleSlotClassNames.contentWrapper}`).snapshot('Hovers the accordion title'),
  ],
};

export default config;
