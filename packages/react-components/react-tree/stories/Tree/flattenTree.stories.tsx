import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, useFlatTreeItems_unstable, flattenTree_unstable } from '@fluentui/react-tree';

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
  const [treeProps, flatTreeItems] = useFlatTreeItems_unstable(defaultItems);
  return (
    <Tree {...treeProps} aria-label="Tree">
      {flatTreeItems.map(treeItemProps => (
        <TreeItem {...treeItemProps} key={treeItemProps.id} />
      ))}
    </Tree>
  );
};
