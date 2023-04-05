import { TreeItem, TreeItemLayout, TreeItemPersonaLayout } from '@fluentui/react-tree';
import descriptionMd from './TreeItemDescription.md';

export { Default } from './TreeItemDefault.stories';
export { ExpandCollapseIconOnly } from './TreeItemExpandCollapseIconOnly.stories';
export { ExpandIcon } from './TreeItemExpandIcon.stories';
export { IconBefore } from './TreeItemIconBefore.stories';
export { IconAfter } from './TreeItemIconAfter.stories';
export { Actions } from './TreeItemActions.stories';
export { WithInlineStyle } from './TreeItemWithInlineStyle.stories';

export default {
  title: 'Preview Components/Tree/TreeItem',
  component: TreeItem,
  subcomponents: { TreeItemLayout, TreeItemPersonaLayout },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
