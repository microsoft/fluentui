import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, useFlatTreeItems_unstable, FlatTreeItem } from '@fluentui/react-tree';

const defaultItems: FlatTreeItem[] = [
  {
    id: '1',
    children: <TreeItemLayout>Level 1, item 1</TreeItemLayout>,
  },
  {
    id: '1-1',
    parentId: '1',
    children: <TreeItemLayout>Level 2, item 1</TreeItemLayout>,
  },
  {
    id: '1-2',
    parentId: '1',
    children: <TreeItemLayout>Level 2, item 2</TreeItemLayout>,
  },
  {
    id: '1-3',
    parentId: '1',
    children: <TreeItemLayout>Level 2, item 3</TreeItemLayout>,
  },
  {
    id: '2',
    children: <TreeItemLayout>Level 1, item 2</TreeItemLayout>,
  },
  {
    id: '2-1',
    parentId: '2',
    children: <TreeItemLayout>Level 2, item 1</TreeItemLayout>,
  },
  {
    id: '2-1-1',
    parentId: '2-1',
    children: <TreeItemLayout>Level 3, item 1</TreeItemLayout>,
  },
  {
    id: '2-2',
    parentId: '2',
    children: <TreeItemLayout>Level 2, item 2</TreeItemLayout>,
  },
  {
    id: '2-2-1',
    parentId: '2-2',
    children: <TreeItemLayout>Level 3, item 1</TreeItemLayout>,
  },
  {
    id: '2-2-2',
    parentId: '2-2',
    children: <TreeItemLayout>Level 3, item 2</TreeItemLayout>,
  },
  {
    id: '2-2-3',
    parentId: '2-2',
    children: <TreeItemLayout>Level 3, item 3</TreeItemLayout>,
  },
  {
    id: '3',
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
