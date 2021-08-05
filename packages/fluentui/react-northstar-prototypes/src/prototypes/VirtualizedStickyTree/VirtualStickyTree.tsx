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
  teamsTheme,
  TreeProps,
  Tree,
  TreeStylesProps,
  treeClassName,
  useVirtualTree,
  GetItemById,
  ShorthandValue,
} from '@fluentui/react-northstar';
import { TreeContext, TreeRenderContextValue } from '@fluentui/react-northstar/src/components/Tree/context';
import { VariableSizeList, VariableSizeListProps, ListChildComponentProps } from 'react-window';

export interface VirtualStickyTreeProps
  extends Omit<TreeProps, 'selectedItemIds' | 'defaultSelectedItemIds' | 'onSelectedItemIdsChange' | 'selectable'>,
    Pick<VariableSizeListProps, 'height'> {
  /** height of a non-sticky tree item */
  itemSize: number;
  /** height of 1st level sticky tree item */
  stickyItemSize: number;

  /**
   * A function that converts an item to string.
   * Used for keyboard navigation based on the first letter of an item's text content
   */
  itemToString?: (item: ShorthandValue<TreeItemProps>) => string;
}

export interface InnerElementContextType {
  getItemById: GetItemById;
  stickyItemIds: string[];
  stickyItemPusherHeights: number[];
  stickyItemSize: number;
  createTreeItem: (id: string, style: React.CSSProperties) => React.ReactElement<TreeItemProps> | null;
}

export interface VirtualItemData {
  visibleItemIds: string[];
  createTreeItem: (id: string, style: React.CSSProperties) => React.ReactElement<TreeItemProps> | null;
}

export const InnerElementContext = React.createContext<InnerElementContextType>({} as InnerElementContextType);

export const VirtualStickyTreeClassName = 'ui-virtualstickytree';

export const VirtualStickyTree: ComponentWithAs<'div', VirtualStickyTreeProps> = props => {
  const context = useFluentContext();

  const { children, className, design, styles, variables, items, height, itemSize, stickyItemSize } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps([...Tree.handledProps, 'stickyItemSize', 'itemSize', 'itemToString'], props);

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: VirtualStickyTree.displayName,
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

  const stickyItemIds = React.useMemo(() => items.map(item => item.id), [items]);

  const {
    visibleItemIds,
    getItemById,
    registerItemRef,
    activeItemIds,
    focusItemById: baseFocusItemById,
    toggleItemActive: baseToggleItemActive,
    expandSiblings,
    listRef,
    getItemRef,
    getToFocusIDByFirstCharacter,
  } = useVirtualTree({ ...props, defaultActiveItemIds: stickyItemIds });

  const getItemSize = React.useCallback(
    (index: number) => {
      const id = visibleItemIds[index];

      const item = getItemById(id);
      if (item?.level === 1) {
        return stickyItemSize;
      }
      return itemSize;
    },
    [getItemById, itemSize, stickyItemSize, visibleItemIds],
  );

  const scrollToMakeItemVisible = React.useCallback(
    itemOffset => {
      const scrollOffset = Math.max(0, itemOffset - (height as number) / 2); // try to position item in the middle of container
      listRef.current.scrollTo(scrollOffset);
    },
    [height, listRef],
  );

  const focusItemById = React.useCallback(
    (id: string) => {
      baseFocusItemById(id);

      // item is not mounted yet, scroll to make item visible
      if (getItemRef(id) == null) {
        const getItemOffset = index => {
          let result = 0;
          for (let i = 0; i < index; ++i) {
            result += getItemSize(i);
          }
          return result;
        };
        const focusIndex = visibleItemIds.indexOf(id);
        scrollToMakeItemVisible(getItemOffset(focusIndex));
      }
    },
    [baseFocusItemById, getItemRef, getItemSize, scrollToMakeItemVisible, visibleItemIds],
  );

  // get height of the pusher for each sticky item, based on number of their visible descendants
  const stickyItemPusherHeights: number[] = React.useMemo(() => {
    const result = new Array(stickyItemIds.length).fill(0);

    let stickyIndex = 0;
    visibleItemIds.forEach(id => {
      if (id === stickyItemIds[stickyIndex]) {
        stickyIndex++;
      } else {
        result[stickyIndex - 1] += itemSize;
      }
    });
    return result;
  }, [itemSize, stickyItemIds, visibleItemIds]);

  const toggleItemActive = React.useCallback(
    (e: React.SyntheticEvent, idToToggle: string) => {
      if (getItemById(idToToggle).level === 1 && !activeItemIds.includes(idToToggle)) {
        // item is sticky and is to be expanded, scroll as if this item is sticked to top
        let i = 0;
        let scrollOffset = 0;
        while (idToToggle !== stickyItemIds[i]) {
          scrollOffset += stickyItemPusherHeights[i];
          i++;
        }
        (listRef.current as any)?.scrollTo(scrollOffset);
      }

      baseToggleItemActive(e, idToToggle);
    },
    [activeItemIds, baseToggleItemActive, getItemById, listRef, stickyItemIds, stickyItemPusherHeights],
  );

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

  // When using keyboard, and navigate to non-sticky items, they could be hidden behind sticky headers.
  // Scroll to make the focused non-sticky items always visible
  const makeVisibleOnFocus = React.useCallback(
    (id: string, level: number, style: React.CSSProperties) => {
      if (level === 1) {
        return; // focused sticky items are always visible, so no need to deal with them
      }

      const isOverlappingWithSticky = (id: string) => {
        const overlap = (rect1: DOMRect, rect2: DOMRect) =>
          !(rect1?.bottom <= rect2?.top || rect1?.top >= rect2?.bottom);

        const itemRect = getItemRef(id)?.getBoundingClientRect();
        for (const stickyId of stickyItemIds) {
          const stickyRect = getItemRef(stickyId)?.getBoundingClientRect();
          if (overlap(itemRect, stickyRect)) {
            return true;
          }
        }
        return false;
      };

      if (isOverlappingWithSticky(id)) {
        scrollToMakeItemVisible(style.top || 0); // react-window provides style.top, fall back to 0 just in case
      }
    },
    [getItemRef, scrollToMakeItemVisible, stickyItemIds],
  );

  // When using keyboard, and navigate to stickyItems, arrow up/down should navigate to previous item's last child/current Item's first child.
  // But because of virtualization, the destination item is not always rendered, so we scroll to them to force rendering
  const handleArrowUpDownOnSticky = React.useCallback(
    (stickyId, stickyItem) => (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusItemById(stickyItem.childrenIds[0]);
      }
      if (e.key === 'ArrowUp' && stickyItem.index !== 1) {
        const indexAmongVisible = visibleItemIds.indexOf(stickyId);
        if (indexAmongVisible > 0) {
          e.preventDefault();
          focusItemById(visibleItemIds[indexAmongVisible - 1]);
        }
      }
    },
    [focusItemById, visibleItemIds],
  );

  const createTreeItem = React.useCallback(
    (id, style) => {
      const item = getItemById(id);
      if (!item) {
        return null;
      }
      const { expanded, parent, level, index, treeSize, childrenIds } = item;
      return TreeItem.create(item.item, {
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
          onFocus: () => makeVisibleOnFocus(id, level, style),
          ...(level === 1 && expanded && childrenIds.length && { onKeyDown: handleArrowUpDownOnSticky(id, item) }),
        },
      });
    },
    [getA11yProps, getItemById, handleArrowUpDownOnSticky, makeVisibleOnFocus, props.renderItemTitle],
  );

  const innerElementContextValue: InnerElementContextType = React.useMemo(
    () => ({
      getItemById,
      stickyItemIds,
      stickyItemPusherHeights,
      stickyItemSize,
      createTreeItem,
    }),
    [getItemById, stickyItemIds, stickyItemPusherHeights, stickyItemSize, createTreeItem],
  );

  const getItemKey = React.useCallback((index: number, data: VirtualItemData) => data.visibleItemIds[index], []);

  React.useLayoutEffect(() => {
    listRef.current.resetAfterIndex(0);
  }, [listRef, visibleItemIds]); // when item collapsed/expanded (visibleItemIds change), refresh react-window itemSize cache

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
          <InnerElementContext.Provider value={innerElementContextValue}>
            <VariableSizeList
              width={-1} // width is not used for vertical list
              ref={listRef}
              height={height}
              itemSize={getItemSize}
              itemKey={getItemKey}
              itemData={{ visibleItemIds, createTreeItem }}
              itemCount={visibleItemIds.length}
              outerElementType={OuterElementType}
              innerElementType={InnerElementType}
            >
              {ItemWrapper}
            </VariableSizeList>
          </InnerElementContext.Provider>
        </ElementType>,
      )}
    </TreeContext.Provider>
  );
  return element;
};

const getStickyItemStyle = (
  indexAmoungStickyItems: number,
  stickyItemNums: number,
  stickyItemSize: number,
): React.CSSProperties => ({
  height: stickyItemSize,
  zIndex: teamsTheme.siteVariables.zIndexes.overlay,
  position: 'sticky',
  top: indexAmoungStickyItems * stickyItemSize,
  bottom: (stickyItemNums - indexAmoungStickyItems - 1) * stickyItemSize,
  backgroundColor: teamsTheme.siteVariables.colorScheme.default.background3,
});

const InnerElementType = ({ children, style }, ref) => {
  const context = React.useContext(InnerElementContext);
  const { stickyItemIds, stickyItemPusherHeights, stickyItemSize, getItemById, createTreeItem } = context;

  const renderContent = React.useCallback(
    (virtualItems: React.ReactElement<ListChildComponentProps>[]) => {
      const result: Record<
        string,
        {
          stickyItem: React.ReactElement; // the sticky item itself
          pusher: React.ReactElement; // the div pusher with height being the same as all descendents of this sticky item
          children: React.ReactElement[]; // all descendents of this sticky item
        }
      > = {};

      stickyItemIds.forEach((id, index) => {
        result[id] = {
          stickyItem: createTreeItem(id, getStickyItemStyle(index, stickyItemIds.length, stickyItemSize)),
          pusher: (
            <div
              key={`${id}-pusher`}
              style={{ height: stickyItemPusherHeights[index], zIndex: -1 }}
              role="presentation"
            />
          ),
          children: [],
        };
      });

      virtualItems.forEach(virtualItem => {
        const virtualItemId = virtualItem.key as string; // our `getItemKey` makes virtual item's key the same as its corresponding tree item's id
        // get the sticky id to which the current virtualItem belongs to
        let parentId = getItemById(virtualItemId)?.parent;
        let parentItem = getItemById(parentId);
        while (parentItem && parentItem.level > 1) {
          parentId = parentItem.parent;
          parentItem = getItemById(parentId);
        }
        if (result[parentId] == null) {
          return;
        }
        result[parentId].children.push(virtualItem);
      });

      const flattenedResult = [];
      stickyItemIds.forEach(id => {
        flattenedResult.push(result[id].stickyItem);
        flattenedResult.push(result[id].pusher);
        result[id].children.forEach(child => {
          flattenedResult.push(child);
        });
      });

      return flattenedResult;
    },
    [createTreeItem, getItemById, stickyItemIds, stickyItemPusherHeights, stickyItemSize],
  );

  return (
    <div style={style} role="none">
      {renderContent(children)}
    </div>
  );
};

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} role="none" />);

// memorize to avoid unnecessary re-renders, for example on scrolling
// recommended approach by react-window: https://react-window.now.sh/#/api/FixedSizeList
const ItemWrapper = React.memo<ListChildComponentProps & { data: VirtualItemData }>(({ index, style, data }) => {
  const { visibleItemIds, createTreeItem } = data;
  return createTreeItem(visibleItemIds[index], style);
});

VirtualStickyTree.displayName = 'VirtualStickyTree';

VirtualStickyTree.defaultProps = {
  accessibility: treeBehavior,
  itemSize: 50,
};
