import * as React from 'react';
import { Tree, TreeItem } from '@fluentui/react-tree';
import { TreeOpenChangeData, TreeOpenChangeEvent } from '../../src/Tree';

export const ControllingOpenAndClose = () => {
  const [openItems, setOpenItems] = React.useState<string[]>([]);
  const handleOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenItems(curr =>
      data.open ? [...curr, event.currentTarget.id] : curr.filter(id => id !== event.currentTarget.id),
    );
  };
  return (
    <Tree aria-label="Tree" openItems={openItems} onOpenChange={handleOpenChange}>
      <TreeItem id="tree-item-1">
        level 1, item 1
        <Tree>
          <TreeItem>level 2, item 1</TreeItem>
          <TreeItem>level 2, item 2</TreeItem>
          <TreeItem>level 2, item 3</TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem id="tree-item-2">
        level 1, item 2
        <Tree>
          <TreeItem id="tree-item-3">
            level 2, item 1
            <Tree>
              <TreeItem>level 3, item 1</TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};
