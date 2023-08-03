import * as React from 'react';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeItemValue,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
} from '@fluentui/react-tree';
import story from './TreeItemExpandCollapseIconOnly.md';

export const ExpandCollapseIconOnly = () => {
  const [openItems, setOpenItems] = React.useState<Set<TreeItemValue>>(() => new Set());
  const onOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    if (data.type === 'Click' || data.type === 'Enter') {
      alert('click on item');
      return;
    }
    const nextOpenItems = new Set(openItems);
    if (data.open) {
      nextOpenItems.add(data.value);
    } else {
      nextOpenItems.delete(data.value);
    }
    setOpenItems(nextOpenItems);
  };

  return (
    <Tree openItems={openItems} aria-label="Tree" onOpenChange={onOpenChange}>
      <TreeItem itemType="branch" value="default-subtree-1">
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

ExpandCollapseIconOnly.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
