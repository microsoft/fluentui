import * as React from 'react';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
} from '@fluentui/react-components';

const SELECTION_MODE = 'multiselect'; // change to "single" for single selection

type CustomItem = HeadlessFlatTreeItemProps & { content: string };

const items: CustomItem[] = [
  { value: '1', content: 'Level 1, item 1' },
  { value: '1-1', parentValue: '1', content: 'Level 2, item 1' },
  { value: '1-2', parentValue: '1', content: 'Level 2, item 2' },
  { value: '2', content: 'Level 1, item 2' },
  { value: '2-1', parentValue: '2', content: 'Level 2, item 1' },
  { value: '2-1-1', parentValue: '2-1', content: 'Level 3, item 1' },
  { value: '2-2', parentValue: '2', content: 'Level 2, item 2' },
  { value: '2-2-1', parentValue: '2-2', content: 'Level 3, item 1' },
  { value: '2-2-2', parentValue: '2-2', content: 'Level 3, item 2' },
  { value: '3', content: 'Level 1, item 3' },
];

export const Selection = () => {
  const flatTree = useHeadlessFlatTree_unstable(items, {
    defaultOpenItems: ['1', '2', '2-1', '2-2'],
    defaultCheckedItems: ['1-2'],
    selectionMode: SELECTION_MODE,
  });

  return (
    <FlatTree {...flatTree.getTreeProps()} aria-label="Selection">
      {Array.from(flatTree.items(), flatTreeItem => {
        const { content, ...treeItemProps } = flatTreeItem.getTreeItemProps();
        return (
          <FlatTreeItem {...treeItemProps} key={flatTreeItem.value}>
            <TreeItemLayout>{content}</TreeItemLayout>
          </FlatTreeItem>
        );
      })}
    </FlatTree>
  );
};

Selection.parameters = {
  docs: {
    description: {
      story: `
The tree component offers selectable functionality in both single and multi-selection modes. You can enable this feature by passing the \`selectionMode\` prop with either \`single\` or \`multiselect\` value.

- \`Tree\`: In nested tree, you are responsible for controlling the selection state, as it would be difficult to manage the state in an uncontrolled manner without knowing the items upfront.
- \`FlatTree\`: In flat tree, you can take advantage of an uncontrolled state for easier management, as the items are known upfront. It is also possible to use a controlled state if you need to manage the selection state externally.

The selection process works similarly to how open/close state works. Use the \`defaultCheckedItems\` prop for default selections and the \`checkedItems\` prop and \`onCheckedChange\` callback to control the selected items.
      `,
    },
  },
};
