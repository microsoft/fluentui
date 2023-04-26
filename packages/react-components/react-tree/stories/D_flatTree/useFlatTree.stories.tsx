import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, useFlatTree_unstable, FlatTreeItemProps } from '@fluentui/react-tree';
import story from './useFlatTree.md';

type Item = FlatTreeItemProps & { content: string };

const defaultItems: Item[] = [
  { value: '1', content: 'Level 1, item 1' },
  { value: '1-1', parentValue: '1', content: 'Level 2, item 1' },
  { value: '1-2', parentValue: '1', content: 'Level 2, item 2' },
  { value: '1-3', parentValue: '1', content: 'Level 2, item 3' },
  { value: '2', content: 'Level 1, item 2' },
  { value: '2-1', parentValue: '2', content: 'Level 2, item 1' },
  { value: '2-1-1', parentValue: '2-1', content: 'Level 3, item 1' },
  { value: '2-2', parentValue: '2', content: 'Level 2, item 2' },
  { value: '2-2-1', parentValue: '2-2', content: 'Level 3, item 1' },
  { value: '2-2-2', parentValue: '2-2', content: 'Level 3, item 2' },
  { value: '2-2-3', parentValue: '2-2', content: 'Level 3, item 3' },
  { value: '3', content: 'Level 1, item 3' },
];

export const UseFlatTree = () => {
  const flatTree = useFlatTree_unstable(defaultItems);

  return (
    <Tree {...flatTree.getTreeProps()} aria-label="Tree">
      {Array.from(flatTree.items(), flatTreeItem => {
        const { content, ...treeItemProps } = flatTreeItem.getTreeItemProps();
        return (
          <TreeItem {...treeItemProps} key={flatTreeItem.value}>
            <TreeItemLayout>{content}</TreeItemLayout>
          </TreeItem>
        );
      })}
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
