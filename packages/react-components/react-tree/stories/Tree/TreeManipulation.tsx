import * as React from 'react';
import {
  FlatTree as Tree,
  TreeItem,
  TreeItemLayout,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
} from '@fluentui/react-tree';
import { Delete20Regular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-button';
import { HeadlessTreeItem } from '../../src/utils/createHeadlessTree';

type ItemProps = HeadlessFlatTreeItemProps & { content: string };

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

const CustomTreeItem = ({
  item,
  isItemRemovable,
  onRemoveItem,
}: {
  item: HeadlessTreeItem<ItemProps>;
  onRemoveItem: (id: string) => void;
  isItemRemovable: boolean;
}) => {
  const { content, ...treeItemProps } = item.getTreeItemProps();

  const handleRemoveItem = React.useCallback(() => {
    onRemoveItem(item.value.toString());
  }, [item, onRemoveItem]);

  return (
    <TreeItem key={item.value} {...treeItemProps}>
      <TreeItemLayout
        actions={
          isItemRemovable ? (
            <Button
              aria-label="Remove item"
              appearance="subtle"
              onClick={handleRemoveItem}
              icon={<Delete20Regular />}
            />
          ) : undefined
        }
      >
        {content}
      </TreeItemLayout>
    </TreeItem>
  );
};

export const TreeManipulation = () => {
  const [trees, setTrees] = React.useState(defaultSubTrees);

  const handleOpenChange = (_: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    // casting here to string as no number values are used in this example
    const value = data.value as string;
    if (value.endsWith('-btn')) {
      const subtreeIndex = Number(value[0]) - 1;
      addFlatTreeItem(subtreeIndex);
    }
  };

  const addFlatTreeItem = (subtreeIndex: number) =>
    setTrees(currentTrees => {
      const lastItem = currentTrees[subtreeIndex][currentTrees[subtreeIndex].length - 1];
      const newItemValue = `${subtreeIndex + 1}-${Number(lastItem.value.toString().slice(2)) + 1}`;
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

  const removeFlatTreeItem = React.useCallback(
    (value: string) =>
      setTrees(currentTrees => {
        const subtreeIndex = Number(value[0]) - 1;
        const nextSubTree = trees[subtreeIndex].filter(item => item.value !== value);
        return [...currentTrees.slice(0, subtreeIndex), nextSubTree, ...currentTrees.slice(subtreeIndex + 1)];
      }),
    [trees],
  );

  const flatTree = useHeadlessFlatTree_unstable(
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
      {Array.from(flatTree.items(), item => (
        <CustomTreeItem
          item={item}
          isItemRemovable={!(item.level === 1 || item.value.toString().endsWith('-btn'))}
          onRemoveItem={removeFlatTreeItem}
        />
      ))}
    </Tree>
  );
};

TreeManipulation.parameters = {
  docs: {
    description: {
      story:
        'With a flat tree structure, you can easily manipulate the tree and control its state. In the example below, you can add or remove tree items by working with the `parentValue` property, which ensures the correct parent-child relationships within the tree',
    },
  },
};
