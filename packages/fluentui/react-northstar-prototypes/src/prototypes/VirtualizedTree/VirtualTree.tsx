import * as React from 'react';
import { treeBehavior } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  useUnhandledProps,
  getElementType,
  useAccessibility,
  useStyles,
  useFluentContext,
} from '@fluentui/react-bindings';
import * as _ from 'lodash';
import {
  rtlTextContainer,
  TreeItem,
  TreeItemProps,
  TreeProps,
  Tree,
  treeClassName,
  TreeStylesProps,
  useVirtualTree,
  ObjectShorthandCollection,
  ShorthandValue,
} from '@fluentui/react-northstar';
import { TreeContext, TreeRenderContextValue } from '@fluentui/react-northstar/src/components/Tree/context';
import { VariableSizeList, VariableSizeListProps, ListChildComponentProps } from 'react-window';

export interface VirtualTreeProps
  extends Omit<
      TreeProps,
      'selectedItemIds' | 'defaultSelectedItemIds' | 'onSelectedItemIdsChange' | 'selectable' | 'items'
    >,
    Pick<VariableSizeListProps, 'estimatedItemSize' | 'height'> {
  // Where itemSize is in px
  items?: ObjectShorthandCollection<TreeItemProps & { itemSize: number }>;

  /**
   * A function that converts an item to string.
   * Used for keyboard navigation based on the first letter of an item's text content
   */
  itemToString?: (item: ShorthandValue<TreeItemProps>) => string;
}

export interface VirtualItemData {
  visibleItemIds: string[];
  createTreeItem: (id: string, style: React.CSSProperties) => React.ReactElement<TreeItemProps> | null;
}

export const VirtualTree: ComponentWithAs<'div', VirtualTreeProps> = props => {
  const context = useFluentContext();

  const { children, className, design, styles, variables, height, estimatedItemSize } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(
    [...Tree.handledProps, 'estimatedItemSize', 'itemSize', 'itemToString'],
    props,
  );

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: VirtualTree.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<TreeStylesProps>(Tree.displayName, {
    className: treeClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const {
    visibleItemIds,
    getItemById,
    registerItemRef,
    toggleItemActive,
    focusItemById,
    expandSiblings,
    listRef,
    getToFocusIDByFirstCharacter,
  } = useVirtualTree(props);

  const contextValue: TreeRenderContextValue = React.useMemo(
    () => ({
      getItemById,
      registerItemRef,
      toggleItemActive,
      focusItemById,
      expandSiblings,
      toggleItemSelect: _.noop,
      getToFocusIDByFirstCharacter,
    }),
    [getItemById, registerItemRef, toggleItemActive, focusItemById, expandSiblings, getToFocusIDByFirstCharacter],
  );

  // always use item id as key instead of index (react-window's default)
  const getItemKey = React.useCallback((index: number, data: VirtualItemData) => data.visibleItemIds[index], []);

  const getItemSize = (index: number) => {
    const id = visibleItemIds[index];
    return getItemById(id).item.itemSize || estimatedItemSize;
  };
  React.useLayoutEffect(() => {
    listRef.current.resetAfterIndex(0);
  }, [listRef, visibleItemIds]); // when item collapsed/expanded (visibleItemIds change), refresh react-window itemSize cache

  const createTreeItem = React.useCallback<VirtualItemData['createTreeItem']>(
    (id, style) => {
      const item = getItemById(id);
      if (item) {
        const { expanded, parent, level, index, treeSize } = item;
        const { itemSize, ...rest } = item.item;
        return TreeItem.create(rest, {
          defaultProps: () =>
            getA11yProps('item', {
              renderItemTitle: props.renderItemTitle,
            }),
          overrideProps: {
            style, // came from react-window
            expanded,
            parent,
            key: id,
            level,
            index,
            treeSize,
            selectable: false,
          },
        });
      }
      return null;
    },
    [getA11yProps, getItemById, props.renderItemTitle],
  );

  const element = (
    <TreeContext.Provider value={contextValue}>
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes.root,
            ...rtlTextContainer.getAttributes({ forElements: [children] }),
            ...unhandledProps,
          })}
        >
          <VariableSizeList
            width={-1} // width is not used for vertical list
            ref={listRef}
            height={height}
            estimatedItemSize={estimatedItemSize}
            itemSize={getItemSize}
            itemKey={getItemKey}
            itemData={{ visibleItemIds, createTreeItem }}
            itemCount={visibleItemIds.length}
            outerElementType={OuterElementType}
            innerElementType={InnerElementType}
          >
            {ItemWrapper}
          </VariableSizeList>
        </ElementType>,
      )}
    </TreeContext.Provider>
  );
  return element;
};

const InnerElementType = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} role="none" />);
const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} role="none" />);

// memorize to avoid unnecessary re-renders, for example on scrolling
// recommended approach by react-window: https://react-window.now.sh/#/api/FixedSizeList
const ItemWrapper = React.memo<ListChildComponentProps & { data: VirtualItemData }>(({ index, style, data }) => {
  const { visibleItemIds, createTreeItem } = data;
  return createTreeItem(visibleItemIds[index], style);
});

VirtualTree.displayName = 'VirtualTree';

VirtualTree.defaultProps = {
  accessibility: treeBehavior,
  estimatedItemSize: 50,
};
