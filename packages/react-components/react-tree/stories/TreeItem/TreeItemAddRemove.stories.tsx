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
    { id: '1', children: <TreeItemLayout>Level 1, item 1</TreeItemLayout> },
    { id: '1-1', parentId: '1', children: <TreeItemLayout>Item 1-1</TreeItemLayout> },
    { id: '1-2', parentId: '1', children: <TreeItemLayout>Item 1-2</TreeItemLayout> },
  ],
  [
    { id: '2', children: <TreeItemLayout>Level 1, item 2</TreeItemLayout> },
    { id: '2-1', parentId: '2', children: <TreeItemLayout>Item 2-1</TreeItemLayout> },
  ],
];

export const AddRemoveTreeItem = () => {
  const [trees, setTrees] = React.useState(defaultSubTrees);

  const handleOpenChange = (_: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    if (data.target.id.endsWith('-btn')) {
      setTrees(currentTrees => {
        const subtreeIndex = Number(data.target.id[0]) - 1;
        const lastItem = currentTrees[subtreeIndex][currentTrees[subtreeIndex].length - 1];
        const newItemId = `${subtreeIndex + 1}-${Number(lastItem.id.slice(2)) + 1}`;
        const nextSubTree = [
          ...currentTrees[subtreeIndex],
          {
            id: newItemId,
            parentId: currentTrees[subtreeIndex][0].id,
            children: <TreeItemLayout>New item {newItemId}</TreeItemLayout>,
          },
        ];
        return [...currentTrees.slice(0, subtreeIndex), nextSubTree, ...currentTrees.slice(subtreeIndex + 1)];
      });
    }
  };

  const removeFlatTreeItem = (id: string) => {
    const subtreeIndex = Number(id[0]) - 1;
    const nextSubTree = trees[subtreeIndex].filter(item => item.id !== id);
    setTrees(currentTrees => [
      ...currentTrees.slice(0, subtreeIndex),
      nextSubTree,
      ...currentTrees.slice(subtreeIndex + 1),
    ]);
  };

  const flatTree = useFlatTree_unstable(
    React.useMemo(
      () => [
        ...trees[0],
        {
          id: '1-btn',
          parentId: '1',
          children: <TreeItemLayout>Add new item</TreeItemLayout>,
        },
        ...trees[1],
        {
          id: '2-btn',
          parentId: '2',
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
        const isUndeletable = item.level === 1 || item.id.endsWith('-btn');
        return (
          <TreeItem
            key={item.id}
            {...item.getTreeItemProps()}
            actions={
              isUndeletable ? null : (
                <Button
                  aria-label="Remove item"
                  appearance="subtle"
                  onClick={() => removeFlatTreeItem(item.id)}
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
