import { TabList } from '@fluentui/react-headless-components-preview/tab-list';

import descriptionMd from './TabListDescription.md';

import { getBrowserSupportNotice } from '../shared/browserSupportNotice';

export { Default } from './TabListDefault.stories';

export default {
  title: 'Components/TabList',
  component: TabList,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, getBrowserSupportNotice('TabList')].join('\n'),
      },
    },
  },
};
