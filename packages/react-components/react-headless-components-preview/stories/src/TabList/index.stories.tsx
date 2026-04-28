import { TabList } from '@fluentui/react-headless-components-preview/tab-list';

import descriptionMd from './TabListDescription.md';
import tabListCss from '../../../../../../bebop/components/tab-list.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

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

    ...withCssModuleSource({ name: 'tab-list.module.css', source: tabListCss }),
  },
};
