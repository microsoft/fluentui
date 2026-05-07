import { TabList } from '@fluentui/react-headless-components-preview/tab-list';

import descriptionMd from './TabListDescription.md';

export { Default } from './TabListDefault.stories';

export default {
  title: 'Headless Components/TabList',
  component: TabList,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
