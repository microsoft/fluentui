import { MenuItemSwitch } from '@fluentui/react-menu';

import descriptionMd from './MenuItemSwitchDescription.md';
import bestPracticesMd from './MenuItemSwitchBestPractices.md';

export { Default } from './MenuItemSwitchDefault.stories';

export default {
  title: 'Components/MenuItemSwitch',
  component: MenuItemSwitch,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
