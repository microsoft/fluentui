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
  TreeStylesProps,
  treeClassName,
  ShorthandValue,
} from '@fluentui/react-northstar';
import { TreeContext, TreeRenderContextValue } from '@fluentui/react-northstar/src/components/Tree/context';
import { VariableSizeList, VariableSizeListProps } from 'react-window';
import {
  InnerElementContext,
  InnerElementContextType,
  InnerElementType,
  ItemWrapper,
  OuterElementType,
  useVirtualStickyTree,
  VirtualItemData,
} from './useVirtualStickyTree';

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

VirtualStickyTree.displayName = 'VirtualStickyTree';

VirtualStickyTree.defaultProps = {
  accessibility: treeBehavior,
  itemSize: 50,
};
