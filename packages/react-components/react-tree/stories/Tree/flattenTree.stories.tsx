import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, useFlatTree_unstable, flattenTree_unstable } from '@fluentui/react-tree';
import story from './flattenTree.md';

const defaultItems = flattenTree_unstable([
  {
    children: <TreeItemLayout>level 1, item 1</TreeItemLayout>,
    subtree: [
      {
        children: <TreeItemLayout>level 2, item 1</TreeItemLayout>,
      },
      {
        children: <TreeItemLayout>level 2, item 2</TreeItemLayout>,
      },
      {
        children: <TreeItemLayout>level 2, item 3</TreeItemLayout>,
      },
    ],
  },
  {
    children: <TreeItemLayout>level 1, item 2</TreeItemLayout>,
    subtree: [
      {
        children: <TreeItemLayout>level 2, item 1</TreeItemLayout>,
        subtree: [
          {
            children: <TreeItemLayout>level 3, item 1</TreeItemLayout>,
            subtree: [
              {
                children: <TreeItemLayout>level 4, item 1</TreeItemLayout>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export const FlattenTree = () => {
  const flatTree = useFlatTree_unstable(defaultItems);
  return (
    <Tree {...flatTree.getTreeProps()} aria-label="Tree">
      {Array.from(flatTree.items(), item => (
        <TreeItem {...item.getTreeItemProps()} key={item.id} />
      ))}
    </Tree>
  );
};

FlattenTree.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
