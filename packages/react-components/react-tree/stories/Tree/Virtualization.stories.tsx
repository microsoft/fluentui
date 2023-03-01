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
  TreeNavigationData_unstable,
  TreeNavigationEvent_unstable,
  FlatTreeItemProps,
} from '@fluentui/react-tree';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps } from 'react-window';
import { ForwardRefComponent, getSlots } from '@fluentui/react-components';
import { ArrowLeft, End, Home } from '@fluentui/keyboard-keys';

const item1: FlatTreeItem[] = [
  {
    id: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Level 1, item 1</TreeItemLayout>,
  },
  ...new Array(300).fill(undefined).map<FlatTreeItem>((_, i) => ({
    id: `flatTreeItem_lvl-1_item-1--child:${i}`,
    parentId: 'flatTreeItem_lvl-1_item-1',
    children: <TreeItemLayout>Item {i + 1}</TreeItemLayout>,
  })),
];
const item2: FlatTreeItem[] = [
  {
    id: 'flatTreeItem_lvl-1_item-2',
    children: <TreeItemLayout>Level 1, item 2</TreeItemLayout>,
  },
  ...new Array(300).fill(undefined).map<FlatTreeItem>((_, i) => ({
    id: `flatTreeItem_lvl-1_item-2--child:${i}`,
    parentId: 'flatTreeItem_lvl-1_item-2',
    children: <TreeItemLayout>Item {i + 1}</TreeItemLayout>,
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
  const listRef = React.useRef<FixedSizeList>(null);
  const items = flatTreeItems.toArray();

  // ArrowLeft, Home and End navigation might not work since the element that you navigate to might not be mounted
  // scrolling into the element to ensure it is mounted before invoking `treeProps.onOpenChange` solves this
  const handleNavigation = (event: TreeNavigationEvent_unstable, data: TreeNavigationData_unstable) => {
    event.preventDefault();
    if (data.type === ArrowLeft) {
      listRef.current?.scrollTo(Number(event.currentTarget.getAttribute('aria-posinset')));
    } else if (data.type === Home) {
      listRef.current?.scrollToItem(0);
    } else if (data.type === End) {
      listRef.current?.scrollToItem(items.length - 1);
    }
    requestAnimationFrame(() => {
      treeProps.onNavigation_unstable(event, data);
    });
  };
  return (
    <FixedSizeTree
      listProps={{
        ref: listRef,
        height: 300,
        itemCount: items.length,
        itemData: items,
        itemSize: 32,
        width: 300,
        children: FixedSizeTreeItem,
      }}
      {...treeProps}
      onNavigation_unstable={handleNavigation}
      aria-label="Tree"
    />
  );
};
