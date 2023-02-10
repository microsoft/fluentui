import { TreeItemPersonaLayout } from '@fluentui/react-tree';

import descriptionMd from './TreeItemPersonaLayoutDescription.md';

export { Default } from './TreeItemPersonaLayoutDefault.stories';
export { TreePersonaLayout } from './TreePersonaLayout.stories';
export { WithDescription } from './TreeItemPersonaLayoutWithDescription.stories';
export { ReadUnread } from './TreeItemPersonaLayoutReadUnread.stories';
export { Media } from './TreeItemPersonaLayoutMedia.stories';

export default {
  title: 'Preview Components/Tree/PersonaTreeItem',
  component: TreeItemPersonaLayout,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
