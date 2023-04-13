import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, useFlatTree_unstable, FlatTreeItemProps } from '@fluentui/react-tree';
import story from './useFlatTree.md';

const defaultItems: FlatTreeItemProps[] = [
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

export const UseFlatTree = () => {
  const flatTree = useFlatTree_unstable(defaultItems);

  return (
    <Tree {...flatTree.getTreeProps()} aria-label="Tree">
      {Array.from(flatTree.items(), flatTreeItem => (
        <TreeItem {...flatTreeItem.getTreeItemProps()} key={flatTreeItem.id} />
      ))}
    </Tree>
  );
};

UseFlatTree.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
