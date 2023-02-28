import * as React from 'react';
import {
  TreeProps,
  TreeItem,
  TreeItemLayout,
  FlatTreeItemProps,
  useFlatTreeItems_unstable,
  useTree_unstable,
  useTreeStyles_unstable,
  useTreeContextValues_unstable,
  TreeProvider,
  TreeSlots,
} from '@fluentui/react-tree';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps } from 'react-window';
import { ForwardRefComponent, getSlots } from '@fluentui/react-components';

const item1: FlatTreeItemProps[] = [
  {
    id: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Level 1, item 1</TreeItemLayout>,
  },
  ...new Array(300).fill(undefined).map<FlatTreeItemProps>((_, i) => ({
    id: `flatTreeItem_lvl-1_item-1--child:${i}`,
    parentId: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Item {i + 1}</TreeItemLayout>,
  })),
];
const item2: FlatTreeItemProps[] = [
  {
    id: 'flatTreeItem_lvl-1_item-2',
    children: <TreeItemLayout>Level 1, item 2</TreeItemLayout>,
  },
  ...new Array(300).fill(undefined).map<FlatTreeItemProps>((_, i) => ({
    id: `flatTreeItem_lvl-1_item-2--child:${i}`,
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

export interface FixedSizeTreeItemProps extends ListChildComponentProps {
  data: FlatTreeItemProps[];
}

const FixedSizeTreeItem = (props: FixedSizeTreeItemProps) => {
  const treeItemProps = props.data[props.index];
  return (
    <TreeItem {...treeItemProps} style={props.style}>
      <TreeItemLayout>Item {props.index}</TreeItemLayout>
    </TreeItem>
  );
};

export const Virtualization = () => {
  const [treeProps, flatTreeItems] = useFlatTreeItems_unstable([...item1, ...item2]);
  const items = flatTreeItems.toArray();
  return (
    <FixedSizeTree
      listProps={{
        height: 300,
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
