import * as React from 'react';
import {
  TreeProps,
  TreeItem,
  TreeItemLayout,
  useTree_unstable,
  useTreeStyles_unstable,
  useTreeContextValues_unstable,
  TreeProvider,
  TreeSlots,
  TreeNavigationData_unstable,
  TreeNavigationEvent_unstable,
  FlatTreeItemProps,
  useFlatTree_unstable,
  FlatTreeItem,
} from '@fluentui/react-tree';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps } from 'react-window';
import { ForwardRefComponent, getSlots } from '@fluentui/react-components';
import story from './Virtualization.md';

const defaultItems: FlatTreeItemProps[] = [
  {
    id: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Level 1, item 1</TreeItemLayout>,
  },
  ...Array.from({ length: 300 }, (_, i) => ({
    id: `flatTreeItem_lvl-1_item-1--child:${i}`,
    parentId: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Item {i + 1}</TreeItemLayout>,
  })),
  {
    id: 'flatTreeItem_lvl-1_item-2',
    children: <TreeItemLayout>Level 1, item 2</TreeItemLayout>,
  },
  ...Array.from({ length: 300 }, (_, index) => ({
    id: `flatTreeItem_lvl-1_item-2--child:${index}`,
    parentId: 'flatTreeItem_lvl-1_item-2',
    children: <TreeItemLayout>Item {index + 1}</TreeItemLayout>,
  })),
];

type FixedSizeTreeProps = Omit<TreeProps, 'children'> & {
  listProps: FixedSizeListProps & { ref?: React.Ref<FixedSizeList> };
};

const FixedSizeTree: ForwardRefComponent<FixedSizeTreeProps> = React.forwardRef((props, ref) => {
  const state = useTree_unstable(props, ref);
  useTreeStyles_unstable(state);
  const contextValues = useTreeContextValues_unstable(state);
  const { slots, slotProps } = getSlots<TreeSlots>(state);
  return (
    <TreeProvider value={contextValues.tree}>
      <slots.root {...slotProps.root}>
        <FixedSizeList {...props.listProps} />
      </slots.root>
    </TreeProvider>
  );
});

interface FixedSizeTreeItemProps extends ListChildComponentProps {
  data: FlatTreeItem[];
}

const FixedSizeTreeItem = (props: FixedSizeTreeItemProps) => {
  const flatTreeItem = props.data[props.index];
  return (
    <TreeItem {...flatTreeItem.getTreeItemProps()} style={props.style}>
      <TreeItemLayout>Item {props.index}</TreeItemLayout>
    </TreeItem>
  );
};

export const Virtualization = () => {
  const flatTree = useFlatTree_unstable(defaultItems);
  const listRef = React.useRef<FixedSizeList>(null);
  const items = React.useMemo(() => Array.from(flatTree.items()), [flatTree]);

  const handleNavigation = (event: TreeNavigationEvent_unstable, data: TreeNavigationData_unstable) => {
    event.preventDefault();
    const nextItem = flatTree.getNextNavigableItem(items, data);
    if (!nextItem) {
      return;
    }
    if (document.getElementById(nextItem.id)) {
      listRef.current?.scrollToItem(nextItem.index);
      return requestAnimationFrame(() => flatTree.navigate(data));
    }
    flatTree.navigate(data);
  };
  return (
    <FixedSizeTree
      {...flatTree.getTreeProps()}
      listProps={{
        ref: listRef,
        height: 300,
        itemCount: items.length,
        itemData: items,
        itemSize: 32,
        width: 300,
        children: FixedSizeTreeItem,
      }}
      onNavigation_unstable={handleNavigation}
      aria-label="Tree"
    />
  );
};

Virtualization.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
