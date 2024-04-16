import * as React from 'react';
import {
  Tree,
  TreeItemValue,
  TreeItem,
  TreeItemLayout,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
} from '@fluentui/react-components';

export const OpenItemsControlled = () => {
  const [openItems, setOpenItems] = React.useState<Iterable<TreeItemValue>>([]);
  const handleOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenItems(data.openItems);
  };
  return (
    <Tree aria-label="Open Items Controlled" openItems={openItems} onOpenChange={handleOpenChange}>
      <TreeItem itemType="branch" value="tree-item-1">
        <TreeItemLayout>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch" value="tree-item-2">
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch" value="tree-item-3">
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

OpenItemsControlled.parameters = {
  docs: {
    description: {
      story: `
You can also control the open/closed state of \`TreeItem\` components with the Tree component's \`openItems\` prop and \`onOpenChange\` callback. \`openItems\` takes an [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) (like an array or a set) of open IDs, and \`onOpenChange\` updates it as items are opened or closed.
      `,
    },
  },
};
