import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, useFlatTree_unstable, FlatTreeItemProps } from '@fluentui/react-tree';
import story from './useFlatTree.md';

const defaultItems: FlatTreeItemProps[] = [
  {
    value: '1',
    children: <TreeItemLayout>Level 1, item 1</TreeItemLayout>,
  },
  {
    value: '1-1',
    parentValue: '1',
    children: <TreeItemLayout>Level 2, item 1</TreeItemLayout>,
  },
  {
    value: '1-2',
    parentValue: '1',
    children: <TreeItemLayout>Level 2, item 2</TreeItemLayout>,
  },
  {
    value: '1-3',
    parentValue: '1',
    children: <TreeItemLayout>Level 2, item 3</TreeItemLayout>,
  },
  {
    value: '2',
    children: <TreeItemLayout>Level 1, item 2</TreeItemLayout>,
  },
  {
    value: '2-1',
    parentValue: '2',
    children: <TreeItemLayout>Level 2, item 1</TreeItemLayout>,
  },
  {
    value: '2-1-1',
    parentValue: '2-1',
    children: <TreeItemLayout>Level 3, item 1</TreeItemLayout>,
  },
  {
    value: '2-2',
    parentValue: '2',
    children: <TreeItemLayout>Level 2, item 2</TreeItemLayout>,
  },
  {
    value: '2-2-1',
    parentValue: '2-2',
    children: <TreeItemLayout>Level 3, item 1</TreeItemLayout>,
  },
  {
    value: '2-2-2',
    parentValue: '2-2',
    children: <TreeItemLayout>Level 3, item 2</TreeItemLayout>,
  },
  {
    value: '2-2-3',
    parentValue: '2-2',
    children: <TreeItemLayout>Level 3, item 3</TreeItemLayout>,
  },
  {
    value: '3',
    children: <TreeItemLayout>Level 1, item 3</TreeItemLayout>,
  },
];

export const UseFlatTree = () => {
  const flatTree = useFlatTree_unstable(defaultItems);

  return (
    <Tree {...flatTree.getTreeProps()} aria-label="Tree">
      {Array.from(flatTree.items(), flatTreeItem => (
        <TreeItem {...flatTreeItem.getTreeItemProps()} key={flatTreeItem.value} />
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
