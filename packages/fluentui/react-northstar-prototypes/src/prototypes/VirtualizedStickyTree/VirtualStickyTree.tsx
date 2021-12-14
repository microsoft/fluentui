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
  GetItemById,
  ShorthandValue,
} from '@fluentui/react-northstar';
import { TreeContext, TreeRenderContextValue } from '@fluentui/react-northstar/src/components/Tree/context';
import { VariableSizeList, VariableSizeListProps, ListChildComponentProps } from 'react-window';
import { useVirtualStickyTree } from './useVirtualStickyTree';

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

  const { children, className, design, styles, variables, height, stickyItemSize } = props;

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

  const {
    visibleItemIds,
    getItemById,
    registerItemRef,
    focusItemById,
    toggleItemActive,
    expandSiblings,
    listRef,
    getToFocusIDByFirstCharacter,
    getItemSize,
    stable_stickyItemIds,
    stickyItemPusherHeights,
    getItemOverrideProps,
  } = useVirtualStickyTree(props);

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

  const createTreeItem = React.useCallback(
    (id, style) => {
      const item = getItemById(id);
      if (!item) {
        return null;
      }
      const overrideProps = getItemOverrideProps(id, style);
      return TreeItem.create(item.item, {
        defaultProps: () =>
          getA11yProps('item', {
            renderItemTitle: props.renderItemTitle,
          }),
        overrideProps,
      });
    },
    [getA11yProps, getItemById, getItemOverrideProps, props.renderItemTitle],
  );

  const innerElementContextValue: InnerElementContextType = React.useMemo(
    () => ({
      getItemById,
      stickyItemIds: stable_stickyItemIds,
      stickyItemPusherHeights,
      stickyItemSize,
      createTreeItem,
    }),
    [getItemById, stable_stickyItemIds, stickyItemPusherHeights, stickyItemSize, createTreeItem],
  );

  const getItemKey = React.useCallback((index: number, data: VirtualItemData) => data.visibleItemIds[index], []);

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

export const InnerElementType = React.forwardRef<HTMLDivElement, { style: React.CSSProperties }>((props, ref) => {
  const { style, children, ...rest } = props;
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
    <div ref={ref} {...rest} style={style} role="none">
      {renderContent(children as React.ReactElement<ListChildComponentProps>[])}
    </div>
  );
});

export const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div
    ref={ref}
    {...props}
    // OuterElement display scrollbar, it get focus even without any tabindex. Therefore we need to set -1 to not receive focus.
    // tabindex="-1" causes a11y tree computes label from content. We need to set hacky way empty aria-label.
    tabIndex={-1}
    aria-label=" "
  />
));

// memorize to avoid unnecessary re-renders, for example on scrolling
// recommended approach by react-window: https://react-window.now.sh/#/api/FixedSizeList
export const ItemWrapper = React.memo<ListChildComponentProps & { data: VirtualItemData }>(({ index, style, data }) => {
  const { visibleItemIds, createTreeItem } = data;
  return createTreeItem(visibleItemIds[index], style);
});

VirtualStickyTree.displayName = 'VirtualStickyTree';

VirtualStickyTree.defaultProps = {
  accessibility: treeBehavior,
  itemSize: 50,
};
