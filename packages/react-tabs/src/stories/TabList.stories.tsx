import { TabList } from '../index';

import descriptionMd from './TabListDescription.md';
import bestPracticesMd from './TabListBestPractices.md';

export { Default } from './TabListDefault.stories';
export { Vertical } from './TabListVertical.stories';
export { VerticalTabContent } from './TabListVerticalTabContent.stories';
export { Appearance } from './TabListAppearance.stories';

export default {
  title: 'Components/TabList',
  component: TabList,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
