import * as React from 'react';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
  TreeItemValue,
  FlatTreeItemProps,
} from '@fluentui/react-components';
import { Delete20Regular } from '@fluentui/react-icons';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useRestoreFocusTarget,
} from '@fluentui/react-components';

type ItemProps = HeadlessFlatTreeItemProps & { content: string };

const subtrees: ItemProps[][] = [
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

type CustomTreeItemProps = FlatTreeItemProps & {
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- FIXME @bsunderhus
  onRemoveItem?: (value: string) => void;
};

const CustomTreeItem = React.forwardRef(
  ({ onRemoveItem, ...props }: CustomTreeItemProps, ref: React.Ref<HTMLDivElement> | undefined) => {
    const focusTargetAttribute = useRestoreFocusTarget();
    const level = props['aria-level'];
    const value = props.value as string;
    const isItemRemovable = level !== 1 && !value.endsWith('-btn');

    const handleRemoveItem = React.useCallback(() => {
      onRemoveItem?.(value);
    }, [value, onRemoveItem]);

    return (
      <Menu positioning="below-end" openOnContext>
        <MenuTrigger disableButtonEnhancement>
          <FlatTreeItem aria-description="has actions" {...focusTargetAttribute} {...props} ref={ref}>
            <TreeItemLayout
              actions={
                isItemRemovable ? (
                  // this button is accessible via context menu, hence aria-hidden='true'
                  <Button
                    aria-label="Remove item"
                    appearance="subtle"
                    onClick={handleRemoveItem}
                    icon={<Delete20Regular />}
                  />
                ) : undefined
              }
            >
              {props.children}
            </TreeItemLayout>
          </FlatTreeItem>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem onClick={handleRemoveItem}>Remove item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  },
);

export const Manipulation = () => {
  const [trees, setTrees] = React.useState(subtrees);
  const itemToFocusRef = React.useRef<HTMLDivElement>(null);
  const [itemToFocusValue, setItemToFocusValue] = React.useState<TreeItemValue>();

  const handleOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
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
      setItemToFocusValue(newItemValue);
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
        const currentSubTree = trees[subtreeIndex];
        const itemIndex = currentSubTree.findIndex(item => item.value === value);
        const nextSubTree = trees[subtreeIndex].filter((_item, index) => index !== itemIndex);

        const nextItemValue = currentSubTree[itemIndex + 1]?.value;
        const prevItemValue = currentSubTree[itemIndex - 1]?.value;
        setItemToFocusValue(nextItemValue || prevItemValue);

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

  React.useEffect(() => {
    if (itemToFocusRef.current) {
      itemToFocusRef.current.focus();
      setItemToFocusValue(undefined);
    }
  }, [itemToFocusValue]);

  return (
    <FlatTree {...flatTree.getTreeProps()} aria-label="Manipulation">
      {Array.from(flatTree.items(), item => {
        const { content, ...treeItemProps } = item.getTreeItemProps();
        return (
          <CustomTreeItem
            {...treeItemProps}
            key={item.value}
            onRemoveItem={removeFlatTreeItem}
            ref={item.value === itemToFocusValue ? itemToFocusRef : undefined}
          >
            {content}
          </CustomTreeItem>
        );
      })}
    </FlatTree>
  );
};

Manipulation.parameters = {
  docs: {
    description: {
      story: `
With a flat tree structure, you can easily manipulate the tree and control its state. In the example below, you can add or remove tree items by working with the \`parentValue\` property, which ensures the correct parent-child relationships within the tree

> ⚠️ When manipulating tree items, ensure that continuity of keyboard navigation is preserved and prevent unexpected focus loss. This example demonstrates a method for maintaining user focus throughout interactions.
      `,
    },
  },
};
