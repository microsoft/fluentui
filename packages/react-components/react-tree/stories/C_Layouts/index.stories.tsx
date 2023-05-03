import { TreeItemLayout, TreeItemPersonaLayout } from '@fluentui/react-tree';
import descriptionMd from './description.md';

export { Default } from './LayoutsDefault.stories';
export { Layout as TreeItemLayout } from './TreeItemLayout.stories';
export { Aside } from './TreeItemLayoutAside.stories';
export { IconBefore } from './TreeItemLayoutIconBefore.stories';
export { IconAfter } from './TreeItemLayoutIconAfter.stories';
export { Layout as TreeItemPersonaLayout } from './TreeItemPersonaLayout.stories';
export { Media } from './TreeItemPersonaLayoutMedia.stories';
export { WithDescription } from './TreeItemPersonaLayoutWithDescription.stories';
export { ReadUnread } from './TreeItemPersonaLayoutReadUnread.stories';

export default {
  title: 'Preview Components/Tree/Layouts',
  subcomponents: { TreeItemLayout, TreeItemPersonaLayout },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
