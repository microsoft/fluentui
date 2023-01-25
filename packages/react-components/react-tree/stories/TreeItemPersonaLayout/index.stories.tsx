import { TreeItemPersonaLayout } from '@fluentui/react-tree';

import descriptionMd from './TreeItemPersonaLayoutDescription.md';

export { Default } from './TreeItemPersonaLayoutDefault.stories';

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
