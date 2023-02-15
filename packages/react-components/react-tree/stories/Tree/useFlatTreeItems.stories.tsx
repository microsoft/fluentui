import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, FlatTreeItem, useFlatTreeItems_unstable } from '@fluentui/react-tree';

const defaultItems: FlatTreeItem[] = [
  {
    leaf: false,
    'aria-level': 1,
    'aria-setsize': 2,
    'aria-posinset': 1,
    id: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Level 1, item 1</TreeItemLayout>,
  },
  {
    leaf: true,
    'aria-level': 2,
    'aria-setsize': 3,
    'aria-posinset': 1,
    parentId: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Level 2, item 1</TreeItemLayout>,
  },
  {
    leaf: true,
    'aria-level': 2,
    'aria-setsize': 3,
    'aria-posinset': 2,
    parentId: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Level 2, item 2</TreeItemLayout>,
  },
  {
    leaf: true,
    'aria-level': 2,
    'aria-setsize': 3,
    'aria-posinset': 3,
    parentId: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Level 2, item 3</TreeItemLayout>,
  },
  {
    leaf: false,
    'aria-level': 1,
    'aria-setsize': 2,
    'aria-posinset': 2,
    id: 'flatTreeItem_lvl-1_item-2',
    children: <TreeItemLayout>Level 1, item 2</TreeItemLayout>,
  },
  {
    leaf: false,
    'aria-level': 2,
    'aria-setsize': 1,
    'aria-posinset': 1,
    id: 'flatTreeItem_lvl-2_item-1',
    parentId: 'flatTreeItem_lvl-1_item-2',
    children: <TreeItemLayout>Level 2, item 1</TreeItemLayout>,
  },
  {
    leaf: false,
    'aria-level': 3,
    'aria-setsize': 1,
    'aria-posinset': 1,
    parentId: 'flatTreeItem_lvl-2_item-1',
    id: 'flatTreeItem_lvl-3_item-1',
    children: <TreeItemLayout>Level 3, item 1</TreeItemLayout>,
  },
  {
    leaf: true,
    'aria-level': 4,
    'aria-setsize': 1,
    'aria-posinset': 1,
    parentId: 'flatTreeItem_lvl-3_item-1',
    children: <TreeItemLayout>Level 4, item 1</TreeItemLayout>,
  },
];

export const useFlatTreeItems = () => {
  const [treeProps, getTreeItems] = useFlatTreeItems_unstable(defaultItems);
  return (
    <Tree {...treeProps} aria-label="Tree">
      {getTreeItems().map((treeItemProps, index) => (
        <TreeItem {...treeItemProps} key={index} />
      ))}
    </Tree>
  );
};
