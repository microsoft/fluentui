import * as React from 'react';
import { Tree, TreeItem } from '@fluentui/react-tree';
import { TreeOpenChangeData, TreeOpenChangeEvent } from '../../src/Tree';

export const ControllingOpenAndClose = () => {
  const [openSubtrees, setOpenSubtrees] = React.useState<string[]>([]);
  const handleOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenSubtrees(curr => (data.open ? [...curr, data.id] : curr.filter(id => id !== data.id)));
  };
  return (
    <Tree openSubtrees={openSubtrees} onOpenChange={handleOpenChange} aria-label="Tree">
      <TreeItem aria-owns="controlling-open-close-subtree-1">level 1, item 1</TreeItem>
      <Tree id="controlling-open-close-subtree-1">
        <TreeItem>level 2, item 1</TreeItem>
        <TreeItem>level 2, item 2</TreeItem>
        <TreeItem>level 2, item 3</TreeItem>
      </Tree>
      <TreeItem aria-owns="controlling-open-close-subtree-2">level 1, item 2</TreeItem>
      <Tree id="controlling-open-close-subtree-2">
        <TreeItem aria-owns="controlling-open-close-subtree-2.1">level 2, item 1</TreeItem>
        <Tree id="controlling-open-close-subtree-2.1">
          <TreeItem>level 3, item 1</TreeItem>
        </Tree>
      </Tree>
    </Tree>
  );
};
