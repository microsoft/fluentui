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

type Item = TreeItemProps & { layout: string };

const defaultItems = flattenTree_unstable<Item>([
  {
    layout: 'level 1, item 1',
    subtree: [
      { layout: 'level 2, item 1' },
      {
        layout: 'level 2, item 2',
      },
      {
        layout: 'level 2, item 3',
      },
    ],
  },
  {
    layout: 'level 1, item 2',
    subtree: [
      {
        layout: 'level 2, item 1',
        subtree: [
          {
            layout: 'level 3, item 1',
            subtree: [
              {
                layout: 'level 4, item 1',
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
