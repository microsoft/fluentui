import * as React from 'react';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeItemValue,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
} from '@fluentui/react-components';

export const CustomizingInteraction = () => {
  const [openItems, setOpenItems] = React.useState<Iterable<TreeItemValue>>([]);
  const onOpenChange = (_e: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    if (data.type === 'Click' || data.type === 'Enter') {
      alert('click on item');
      return;
    }
    setOpenItems(data.openItems);
  };
  return (
    <Tree aria-label="Customizing Interaction" openItems={openItems} onOpenChange={onOpenChange}>
      <TreeItem itemType="branch" value="default-subtree-1">
        <TreeItemLayout>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch" value="default-subtree-2">
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch" value="default-subtree-2-1">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

CustomizingInteraction.parameters = {
  docs: {
    description: {
      story: `
By default, every expandable TreeItem responds to clicks on both content and the expand/collapse icon. To handle these separately, listen for the \`onOpenChange\` event in the \`Tree\` component. You can check the event type to determine whether the content or the icon was clicked, allowing you to override the default behavior.
      `,
    },
  },
};
