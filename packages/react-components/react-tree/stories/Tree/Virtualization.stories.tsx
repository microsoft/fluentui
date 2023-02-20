import * as React from 'react';
import {
  TreeProps,
  TreeItem,
  TreeItemLayout,
  FlatTreeItem,
  useFlatTreeItems_unstable,
  useTree_unstable,
  useTreeStyles_unstable,
  useTreeContextValues_unstable,
  TreeProvider,
  TreeSlots,
} from '@fluentui/react-tree';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps } from 'react-window';
import { ForwardRefComponent, getSlots } from '@fluentui/react-components';

const item1: FlatTreeItem[] = [
  {
    leaf: false,
    'aria-level': 1,
    'aria-setsize': 2,
    'aria-posinset': 1,
    id: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Level 1, item 1</TreeItemLayout>,
  },
  ...new Array(300).fill(undefined).map<FlatTreeItem>((_, i) => ({
    leaf: true,
    'aria-level': 2,
    'aria-setsize': 300,
    'aria-posinset': i + 1,
    parentId: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Item {i + 1}</TreeItemLayout>,
  })),
];
const item2: FlatTreeItem[] = [
  {
    leaf: false,
    'aria-level': 1,
    'aria-setsize': 2,
    'aria-posinset': 1,
    id: 'flatTreeItem_lvl-1_item-2',
    children: <TreeItemLayout>Level 1, item 2</TreeItemLayout>,
  },
  ...new Array(300).fill(undefined).map<FlatTreeItem>((_, i) => ({
    leaf: true,
    'aria-level': 2,
    'aria-setsize': 300,
    'aria-posinset': i + 1,
    parentId: 'flatTreeItem_lvl-1_item-2',
    children: <TreeItemLayout>Item {i + 1}</TreeItemLayout>,
  })),
];

type FixedSizeTreeProps = Omit<TreeProps, 'children'> & {
  listProps: FixedSizeListProps;
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

const FixedSizeTreeItem = (props: ListChildComponentProps) => {
  const treeItemProps: FlatTreeItem = props.data[props.index];
  return (
    <TreeItem {...treeItemProps} style={props.style}>
      <TreeItemLayout>Item {props.index}</TreeItemLayout>
    </TreeItem>
  );
};

export const Virtualization = () => {
  const [treeProps, getTreeItems] = useFlatTreeItems_unstable([...item1, ...item2]);
  const items = getTreeItems();
  return (
    <FixedSizeTree
      listProps={{
        height: 912,
        itemCount: items.length,
        itemData: items,
        itemSize: 32,
        width: 300,
        children: FixedSizeTreeItem,
      }}
      {...treeProps}
      aria-label="Tree"
    />
  );
};
