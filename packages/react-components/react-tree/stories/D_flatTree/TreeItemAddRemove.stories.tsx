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

const defaultSubTrees: FlatTreeItemProps[][] = [
  [
    { value: '1', children: <TreeItemLayout>Level 1, item 1</TreeItemLayout> },
    { value: '1-1', parentValue: '1', children: <TreeItemLayout>Item 1-1</TreeItemLayout> },
    { value: '1-2', parentValue: '1', children: <TreeItemLayout>Item 1-2</TreeItemLayout> },
  ],
  [
    { value: '2', children: <TreeItemLayout>Level 1, item 2</TreeItemLayout> },
    { value: '2-1', parentValue: '2', children: <TreeItemLayout>Item 2-1</TreeItemLayout> },
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
      const nextSubTree: FlatTreeItemProps[] = [
        ...currentTrees[subtreeIndex],
        {
          value: newItemValue,
          parentValue: currentTrees[subtreeIndex][0].value,
          children: <TreeItemLayout>New item {newItemValue}</TreeItemLayout>,
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
          children: <TreeItemLayout>Add new item</TreeItemLayout>,
        },
        ...trees[1],
        {
          value: '2-btn',
          parentValue: '2',
          children: <TreeItemLayout>Add new item</TreeItemLayout>,
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
        return (
          <TreeItem
            key={item.value}
            {...item.getTreeItemProps()}
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
          />
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
