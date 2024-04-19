/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import * as React from 'react';
import {
  FlatTreeProps,
  FlatTreeItem,
  TreeItemLayout,
  TreeProvider,
  FlatTreeSlots,
  TreeNavigationData_unstable,
  TreeNavigationEvent_unstable,
  useFlatTree_unstable,
  HeadlessFlatTreeItemProps,
  useFlatTreeStyles_unstable,
  useFlatTreeContextValues_unstable,
  HeadlessFlatTreeItem,
  useHeadlessFlatTree_unstable,
} from '@fluentui/react-components';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps } from 'react-window';
import { ForwardRefComponent, assertSlots } from '@fluentui/react-components';

type ItemProps = HeadlessFlatTreeItemProps & { content: string };

const defaultItems: ItemProps[] = [
  {
    value: 'flatTreeItem_lvl-1_item-1',
    content: `Level 1, item 1`,
  },
  ...Array.from({ length: 300 }, (_, i) => ({
    value: `flatTreeItem_lvl-1_item-1--child:${i}`,
    parentValue: 'flatTreeItem_lvl-1_item-1',
    content: `Item ${i + 1}`,
  })),
  {
    value: 'flatTreeItem_lvl-1_item-2',
    content: `Level 1, item 2`,
  },
  ...Array.from({ length: 300 }, (_, index) => ({
    value: `flatTreeItem_lvl-1_item-2--child:${index}`,
    parentValue: 'flatTreeItem_lvl-1_item-2',
    content: `Item ${index + 1}`,
  })),
];

type FixedSizeTreeProps = Omit<FlatTreeProps, 'children'> & {
  listProps: FixedSizeListProps & { ref?: React.Ref<FixedSizeList> };
};

/**
 * FixedSizeTree is a recomposition of Tree component that uses react-window FixedSizeList to render items.
 */
const FixedSizeTree: ForwardRefComponent<FixedSizeTreeProps> = React.forwardRef((props, ref) => {
  const state = useFlatTree_unstable(props, ref);
  useFlatTreeStyles_unstable(state);
  const contextValues = useFlatTreeContextValues_unstable(state);
  assertSlots<FlatTreeSlots>(state);
  const handleOuterRef = React.useCallback((instance: HTMLElement | null) => {
    if (instance) {
      // This element stays between the tree and treeitem
      // Due to accessibility issues this element should have role="none"
      instance.setAttribute('role', 'none');
    }
  }, []);
  return (
    <TreeProvider value={contextValues.tree}>
      <state.root>
        <FixedSizeList outerRef={handleOuterRef} {...props.listProps} />
      </state.root>
    </TreeProvider>
  );
});

interface FixedSizeTreeItemProps extends ListChildComponentProps {
  data: HeadlessFlatTreeItem<ItemProps>[];
}

const FixedSizeTreeItem = (props: FixedSizeTreeItemProps) => {
  const flatTreeItem = props.data[props.index];
  const { content, ...treeItemProps } = flatTreeItem.getTreeItemProps();
  return (
    <FlatTreeItem {...treeItemProps} style={props.style}>
      <TreeItemLayout>{content}</TreeItemLayout>
    </FlatTreeItem>
  );
};

export const Virtualization = () => {
  const headlessTree = useHeadlessFlatTree_unstable(defaultItems);
  const listRef = React.useRef<FixedSizeList>(null);
  const items = React.useMemo(() => Array.from(headlessTree.items()), [headlessTree]);

  /**
   * Since navigation is not possible due to the fact that not all items are rendered,
   * we need to scroll to the next item and then invoke navigation.
   */
  const handleNavigation = (event: TreeNavigationEvent_unstable, data: TreeNavigationData_unstable) => {
    const nextItem = headlessTree.getNextNavigableItem(items, data);
    if (!nextItem) {
      return;
    }
    // if the next item is not rendered, scroll to it and try to navigate again
    if (!headlessTree.getElementFromItem(nextItem)) {
      event.preventDefault(); // preventing default disables internal navigation.
      listRef.current?.scrollToItem(nextItem.index);
      // waiting for the next animation frame to allow the list to be scrolled
      return requestAnimationFrame(() => headlessTree.navigate(data));
    }
  };

  return (
    <FixedSizeTree
      {...headlessTree.getTreeProps()}
      listProps={{
        ref: listRef,
        height: 300,
        itemCount: items.length,
        itemData: items,
        itemSize: 32,
        width: 300,
        children: FixedSizeTreeItem,
      }}
      onNavigation={handleNavigation}
      aria-label="Virtualization"
    />
  );
};

Virtualization.parameters = {
  docs: {
    description: {
      story: `
A tree **does not** support virtualization by default. To enable it, you'll need to adopt a custom third-party virtualization library.

By utilizing virtualization, the tree only renders the nodes that are currently visible on the screen. This significantly reduces the number of DOM nodes, leading to quicker interaction times for large trees.

In this example of a flat tree with \`react-window\` for virtualization, two main adjustments are necessary:

1. \`Tree\` component must be recomposed using composition API to use \`FixedSizeList\` to wrap root content.
2. Navigation will break as some nodes will not be available on the DOM (since they'll be virtualized), to fix this we'll need to provide a custom navigation handler that will scroll to the correct node before calling the default handler.
      `,
    },
  },
};
