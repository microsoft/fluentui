import * as React from 'react';
import {
  FlatTreeItemProps,
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  useFlatTree_unstable,
} from '@fluentui/react-tree';
import { Delete20Regular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-components';
import story from './TreeItemAddRemove.md';

type ItemProps = FlatTreeItemProps & { content: string };

const defaultSubTrees: ItemProps[][] = [
  [
    { value: '1', content: 'Level 1, item 1' },
    { value: '1-1', parentValue: '1', content: 'Item 1-1' },
    { value: '1-2', parentValue: '1', content: 'Item 1-2' },
  ],
  [
    { value: '2', content: 'Level 1, item 2' },
    { value: '2-1', parentValue: '2', content: 'Item 2-1' },
  ],
];

export const AddRemoveTreeItem = () => {
  const [trees, setTrees] = React.useState(defaultSubTrees);

  const handleOpenChange = (_: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    if (data.value.endsWith('-btn')) {
      const subtreeIndex = Number(data.value[0]) - 1;
      addFlatTreeItem(subtreeIndex);
    }
  };

  const addFlatTreeItem = (subtreeIndex: number) =>
    setTrees(currentTrees => {
      const lastItem = currentTrees[subtreeIndex][currentTrees[subtreeIndex].length - 1];
      const newItemValue = `${subtreeIndex + 1}-${Number(lastItem.value.slice(2)) + 1}`;
      const nextSubTree: ItemProps[] = [
        ...currentTrees[subtreeIndex],
        {
          value: newItemValue,
          parentValue: currentTrees[subtreeIndex][0].value,
          content: `New item ${newItemValue}`,
        },
      ];
      return [...currentTrees.slice(0, subtreeIndex), nextSubTree, ...currentTrees.slice(subtreeIndex + 1)];
    });

  const removeFlatTreeItem = (value: string) =>
    setTrees(currentTrees => {
      const subtreeIndex = Number(value[0]) - 1;
      const nextSubTree = trees[subtreeIndex].filter(item => item.value !== value);
      return [...currentTrees.slice(0, subtreeIndex), nextSubTree, ...currentTrees.slice(subtreeIndex + 1)];
    });

  const flatTree = useFlatTree_unstable(
    React.useMemo(
      () => [
        ...trees[0],
        {
          value: '1-btn',
          parentValue: '1',
          content: 'Add new item',
        },
        ...trees[1],
        {
          value: '2-btn',
          parentValue: '2',
          content: 'Add new item',
        },
      ],
      [trees],
    ),
    { defaultOpenItems: ['1', '2'], onOpenChange: handleOpenChange },
  );

  return (
    <Tree {...flatTree.getTreeProps()} aria-label="Tree">
      {Array.from(flatTree.items(), item => {
        const isUndeletable = item.level === 1 || item.value.endsWith('-btn');
        const { content, ...treeItemProps } = item.getTreeItemProps();
        return (
          <TreeItem
            key={item.value}
            {...treeItemProps}
            actions={
              isUndeletable ? null : (
                <Button
                  aria-label="Remove item"
                  appearance="subtle"
                  onClick={() => removeFlatTreeItem(item.value)}
                  icon={<Delete20Regular />}
                />
              )
            }
          >
            <TreeItemLayout>{content}</TreeItemLayout>
          </TreeItem>
        );
      })}
    </Tree>
  );
};

AddRemoveTreeItem.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
