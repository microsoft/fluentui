import { List } from '@fluentui/react-migration-v0-v9';

import descriptionMd from './ListDescription.md';

export { Default as DefaultList } from './Default.stories';
export { Navigable } from './Navigable.stories';
export { Selectable } from './Selectable.stories';

export default {
  title: 'Migration Shims/V0/List',
  component: List,
  args: {
    layout: 'verr',
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
