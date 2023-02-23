import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, FlatTreeItemProps, useFlatTreeItems_unstable } from '@fluentui/react-tree';

const defaultItems: FlatTreeItemProps[] = [
  {
    id: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Level 1, item 1</TreeItemLayout>,
  },
  {
    id: '1',
    parentId: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Level 2, item 1</TreeItemLayout>,
  },
  {
    id: '2',
    parentId: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Level 2, item 2</TreeItemLayout>,
  },
  {
    id: '3',
    parentId: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Level 2, item 3</TreeItemLayout>,
  },
  {
    id: 'flatTreeItem_lvl-1_item-2',
    children: <TreeItemLayout>Level 1, item 2</TreeItemLayout>,
  },
  {
    id: 'flatTreeItem_lvl-2_item-1',
    parentId: 'flatTreeItem_lvl-1_item-2',
    children: <TreeItemLayout>Level 2, item 1</TreeItemLayout>,
  },
  {
    id: '4',
    parentId: 'flatTreeItem_lvl-2_item-1',
    children: <TreeItemLayout>Level 3, item 1</TreeItemLayout>,
  },
  {
    id: '5',
    parentId: 'flatTreeItem_lvl-1_item-2',
    children: <TreeItemLayout>Level 2, item 2</TreeItemLayout>,
  },
  {
    id: '6',
    parentId: '5',
    children: <TreeItemLayout>Level 3, item 1</TreeItemLayout>,
  },
  {
    id: '7',
    parentId: '5',
    children: <TreeItemLayout>Level 3, item 1</TreeItemLayout>,
  },
  {
    id: '8',
    parentId: '5',
    children: <TreeItemLayout>Level 3, item 1</TreeItemLayout>,
  },
  {
    id: '9',
    children: <TreeItemLayout>Level 1, item 3</TreeItemLayout>,
  },
];

export const UseFlatTreeItems = () => {
  const [treeProps, flatTreeItems] = useFlatTreeItems_unstable(defaultItems);
  return (
    <Tree {...treeProps} aria-label="Tree">
      {flatTreeItems.map(treeItemProps => (
        <TreeItem {...treeItemProps} key={treeItemProps.id} />
      ))}
    </Tree>
  );
};
