import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import { Add12Regular, Subtract12Regular } from '@fluentui/react-icons';
import { TreeOpenChangeData, TreeOpenChangeEvent } from '../../src/Tree';
import story from './TreeItemExpandIcon.md';

export const ExpandIcon = () => {
  const [openItems, setOpenItems] = React.useState<string[]>([]);
  const handleOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenItems(curr =>
      data.open ? [...curr, event.currentTarget.id] : curr.filter(id => id !== event.currentTarget.id),
    );
  };
  return (
    <Tree aria-label="Tree" openItems={openItems} onOpenChange={handleOpenChange}>
      <TreeItem
        id="tree-item-1"
        expandIcon={openItems.includes('tree-item-1') ? <Add12Regular /> : <Subtract12Regular />}
      >
        <TreeItemLayout>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem>
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem>
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem>
            <TreeItemLayout>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem
        id="tree-item-2"
        expandIcon={openItems.includes('tree-item-2') ? <Add12Regular /> : <Subtract12Regular />}
      >
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem
            id="tree-item-3"
            expandIcon={openItems.includes('tree-item-3') ? <Add12Regular /> : <Subtract12Regular />}
          >
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem>
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

ExpandIcon.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
