import * as React from 'react';
import { Tree, TreeItem } from '@fluentui/react-tree';
import { Add12Regular, Subtract12Regular } from '@fluentui/react-icons';
import { TreeOpenChangeData, TreeOpenChangeEvent } from '../../src/Tree';

const RenderExpandIcon = ({ openSubtrees, id }: { openSubtrees: string[]; id: string }) =>
  openSubtrees.includes(id) ? <Add12Regular /> : <Subtract12Regular />;

export const ExpandIcon = () => {
  const [openSubtrees, setOpenSubtrees] = React.useState<string[]>([]);
  const handleOpenChange = (_e: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenSubtrees(curr => (data.open ? [...curr, data.id] : curr.filter(id => id !== data.id)));
  };
  return (
    <Tree aria-label="Tree" onOpenChange={handleOpenChange}>
      <TreeItem
        aria-owns="default-subtree-1"
        expandIcon={<RenderExpandIcon openSubtrees={openSubtrees} id="default-subtree-1" />}
      >
        level 1, item 1
      </TreeItem>
      <Tree id="default-subtree-1">
        <TreeItem>level 2, item 1</TreeItem>
        <TreeItem>level 2, item 2</TreeItem>
        <TreeItem>level 2, item 3</TreeItem>
      </Tree>
      <TreeItem
        aria-owns="default-subtree-2"
        expandIcon={<RenderExpandIcon openSubtrees={openSubtrees} id="default-subtree-2" />}
      >
        level 1, item 2
      </TreeItem>
      <Tree id="default-subtree-2">
        <TreeItem
          aria-owns="default-subtree-2-1"
          expandIcon={<RenderExpandIcon openSubtrees={openSubtrees} id="default-subtree-2-1" />}
        >
          level 2, item 1
        </TreeItem>
        <Tree id="default-subtree-2-1">
          <TreeItem>level 3, item 1</TreeItem>
        </Tree>
      </Tree>
    </Tree>
  );
};
