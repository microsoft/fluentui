import { TreeItemLayout, TreeItemPersonaLayout } from '@fluentui/react-tree';
import descriptionMd from './description.md';

export { DefaultTreeItemLayout } from './TreeItemLayoutDefault.stories';
export { DefaultTreeItemPersonaLayout } from './TreeItemPersonaLayoutDefault.stories';
export { Aside } from './TreeItemLayoutAside.stories';
export { Media } from './TreeItemPersonaLayoutMedia.stories';
export { WithDescription } from './TreeItemPersonaLayoutWithDescription.stories';
export { ReadUnread } from './TreeItemPersonaLayoutReadUnread.stories';
export { Layout } from './TreeItemLayout.stories';
export { TreePersonaLayout } from './TreeItemPersonaLayout.stories';

export default {
  title: 'Preview Components/Tree/Layouts',
  component: [TreeItemPersonaLayout, TreeItemLayout],
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
