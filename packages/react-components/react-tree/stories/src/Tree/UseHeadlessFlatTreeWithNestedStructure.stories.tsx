import * as React from 'react';
import {
  FlatTree,
  TreeItem,
  TreeItemLayout,
  useHeadlessFlatTree_unstable,
  HeadlessFlatTreeItemProps,
  TreeItemValue,
} from '@fluentui/react-components';

type FlatTreeItem = HeadlessFlatTreeItemProps & { content: React.ReactNode };
type NestedTreeItem = FlatTreeItem & { subtree?: NestedTreeItem[] };

const flattenTree = (items: NestedTreeItem[], parentValue?: TreeItemValue | undefined): FlatTreeItem[] =>
  items.flatMap<FlatTreeItem>(({ subtree, ...item }) =>
    subtree ? [{ ...item, parentValue }, ...flattenTree(subtree, item.value)] : { parentValue, ...item },
  );

const flatTreeItems = flattenTree([
  {
    value: '1',
    content: <>level 1, item 1</>,
    subtree: [
      {
        value: '1-1',
        content: <>level 2, item 1</>,
      },
      {
        value: '1-2',
        content: <>level 2, item 2</>,
      },
      {
        value: '1-3',
        content: <>level 2, item 3</>,
      },
    ],
  },
  {
    value: '2',
    content: <>level 1, item 2</>,
    subtree: [
      {
        value: '2-1',
        content: <>level 2, item 1</>,
        subtree: [
          {
            value: '2-1-1',
            content: <>level 3, item 1</>,
            subtree: [
              {
                value: '2-1-1-1',
                content: <>level 4, item 1</>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export const UseHeadlessFlatTreeWithNestedStructure = () => {
  const flatTree = useHeadlessFlatTree_unstable(flatTreeItems);
  return (
    <FlatTree {...flatTree.getTreeProps()} aria-label="Flat Tree">
      {Array.from(flatTree.items(), flatTreeItem => {
        const { content, ...treeItemProps } = flatTreeItem.getTreeItemProps();
        return (
          <TreeItem key={treeItemProps.value} {...treeItemProps}>
            <TreeItemLayout>{content}</TreeItemLayout>
          </TreeItem>
        );
      })}
    </FlatTree>
  );
};

UseHeadlessFlatTreeWithNestedStructure.parameters = {
  docs: {
    description: {
      story: `If your data structure is nested, it can be converted to a flat structure before providing it to \`useHeadlessFlatTree\`. Here's an example using recursion and [\`Array.flatMap\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) to convert a nested array of items (nested by the property \`subtree\`) into a flat array of items:`,
    },
  },
};
