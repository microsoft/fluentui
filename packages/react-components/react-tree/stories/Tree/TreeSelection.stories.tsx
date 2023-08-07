import * as React from 'react';
import {
  FlatTree as Tree,
  TreeItem,
  TreeItemLayout,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
} from '@fluentui/react-tree';

const SELECTION_MODE = 'single'; // change to "multiselect" for multiselection

type Item = HeadlessFlatTreeItemProps & { content: string };

const defaultItems: Item[] = [
  { value: '1', content: 'Level 1, item 1' },
  { value: '1-1', parentValue: '1', content: 'Level 2, item 1' },
  { value: '1-2', parentValue: '1', content: 'Level 2, item 2', defaultChecked: true },
  { value: '2', content: 'Level 1, item 2' },
  { value: '2-1', parentValue: '2', content: 'Level 2, item 1' },
  { value: '2-1-1', parentValue: '2-1', content: 'Level 3, item 1' },
  { value: '2-2', parentValue: '2', content: 'Level 2, item 2' },
  { value: '2-2-1', parentValue: '2-2', content: 'Level 3, item 1' },
  { value: '2-2-2', parentValue: '2-2', content: 'Level 3, item 2' },
  { value: '3', content: 'Level 1, item 3' },
];

export const TreeSingleAndMultiSelection = () => {
  const flatTree = useHeadlessFlatTree_unstable(defaultItems, {
    defaultOpenItems: ['1', '2', '2-1', '2-2'],
    selectionMode: SELECTION_MODE,
  });

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

TreeSingleAndMultiSelection.parameters = {
  docs: {
    description: {
      story: `The tree component offers selectable functionality in both single and multi-selection modes. You can enable this feature by passing the \`selectionMode\` prop with either \`single\` or \`multiselect\` value.

- \`Tree\`: In nested tree, you are responsible for controlling the selection state.
- \`FlatTree\` In flat tree, you can take advantage of an uncontrolled state for easier management.

The selection process works similarly to how open/close state works. Use the \`defaultCheckedItems\` prop for default selections and the \`checkedItems\` prop and \`onCheckedChange\` callback to manage the selected items.
      `,
    },
  },
};
