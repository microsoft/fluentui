import * as React from 'react';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  useFlatTree_unstable,
  FlatTreeItemProps,
  TreeItemValue,
  TreeSelectionValue,
} from '@fluentui/react-tree';
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

export const TreeMultipleSelection = () => {
  const flatTree = useFlatTree_unstable(defaultItems, {
    defaultOpenItems: ['1', '2'],
    selectionMode: 'multiselect',
    // defaultCheckedItems: new Map([
    //   ['1-1', true],
    //   ['2-1', true],
    // ]),
    checkedItems: new Map<TreeItemValue, TreeSelectionValue>([
      ['1-1', true],
      ['2-1', 'mixed' as const],
    ]),
  });

  console.log(flatTree.getTreeProps().checkedItems);

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

TreeMultipleSelection.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
