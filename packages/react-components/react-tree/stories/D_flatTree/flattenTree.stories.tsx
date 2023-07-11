import * as React from 'react';
import {
  Tree,
  TreeItem,
  useFlatTree_unstable,
  flattenTree_unstable,
  TreeItemProps,
  TreeItemLayout,
} from '@fluentui/react-tree';
import story from './flattenTree.md';

type Item = TreeItemProps & { layout: React.ReactNode };

const defaultItems = flattenTree_unstable<Item>([
  {
    value: '1',
    layout: <>level 1, item 1</>,
    subtree: [
      {
        value: '1-1',
        layout: <>level 2, item 1</>,
      },
      {
        value: '1-2',
        layout: <>level 2, item 2</>,
      },
      {
        value: '1-3',
        layout: <>level 2, item 3</>,
      },
    ],
  },
  {
    value: '2',
    layout: <>level 1, item 2</>,
    subtree: [
      {
        value: '2-1',
        layout: <>level 2, item 1</>,
        subtree: [
          {
            value: '2-1-1',
            layout: <>level 3, item 1</>,
            subtree: [
              {
                value: '2-1-1-1',
                layout: <>level 4, item 1</>,
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
      {Array.from(flatTree.items(), item => {
        const { layout, ...itemProps } = item.getTreeItemProps();
        return (
          <TreeItem {...itemProps} key={item.value}>
            <TreeItemLayout>{layout}</TreeItemLayout>
          </TreeItem>
        );
      })}
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
