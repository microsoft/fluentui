import * as React from 'react';
import { treeBehavior } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  useTelemetry,
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
} from '@fluentui/react-northstar';
import { TreeContext, TreeRenderContextValue } from '@fluentui/react-northstar/src/components/Tree/context';
import { VariableSizeList, VariableSizeListProps, ListChildComponentProps } from 'react-window';

export interface VirtualTreeProps
  extends Omit<
      TreeProps,
      'selectedItemIds' | 'defaultSelectedItemIds' | 'onSelectedItemIdsChange' | 'selectable' | 'items'
    >,
    Pick<VariableSizeListProps, 'estimatedItemSize' | 'height'> {
  items?: ObjectShorthandCollection<TreeItemProps & { itemSize: number }>;
}

export interface VirtualItemData {
  visibleItemIds: string[];
  createTreeItem: (id: string, style: React.CSSProperties) => React.ReactElement<TreeItemProps> | null;
}

export const VirtualTree: ComponentWithAs<'div', VirtualTreeProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(VirtualTree.displayName, context.telemetry);
  setStart();

  const { children, className, design, styles, variables, height, estimatedItemSize } = props;

  const ElementType = getElementType(props);

  const unhandledProps = useUnhandledProps([...Tree.handledProps, 'estimatedItemSize', 'itemSize'], props);

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
  } = useVirtualTree(props);

  const contextValue: TreeRenderContextValue = React.useMemo(
    () => ({
      getItemById,
      registerItemRef,
      toggleItemActive,
      focusItemById,
      expandSiblings,
      toggleItemSelect: _.noop,
    }),
    [getItemById, registerItemRef, toggleItemActive, focusItemById, expandSiblings],
  );

  const getItemKey = React.useCallback((index: number, data: VirtualItemData) => data.visibleItemIds[index], []);

  const getItemSize = (index: number) => {
    const id = visibleItemIds[index];
    return getItemById(id).item.itemSize || estimatedItemSize;
  };
  React.useLayoutEffect(() => {
    (listRef.current as any)?.resetAfterIndex(0);
  }, [listRef, visibleItemIds]); // when item collapsed/expanded (visibleItemIds change), refresh react-window itemSize cache

  const createTreeItem = React.useCallback(
    (id, style) => {
      const item = getItemById(id);
      if (item) {
        const { expanded, parent, level, index, treeSize } = item;
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
          },
        });
      }
      return null;
    },
    [getA11yProps, getItemById, props.renderItemTitle],
  );

  const innerElementType = React.useMemo(
    () => React.forwardRef((props, ref) => <div ref={ref as React.RefObject<HTMLDivElement>} {...props} role="none" />),
    [],
  );
  const outerElementType = React.useMemo(
    () => React.forwardRef((props, ref) => <div ref={ref as React.RefObject<HTMLDivElement>} {...props} role="none" />),
    [],
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
            outerElementType={outerElementType}
            innerElementType={innerElementType}
          >
            {ItemWrapper}
          </VariableSizeList>
        </ElementType>,
      )}
    </TreeContext.Provider>
  );
  setEnd();
  return element;
};

const ItemWrapper = React.memo<ListChildComponentProps & { data: VirtualItemData }>(({ index, style, data }) => {
  const { visibleItemIds, createTreeItem } = data;
  return createTreeItem(visibleItemIds[index], style);
});

VirtualTree.displayName = 'VirtualTree';

VirtualTree.defaultProps = {
  accessibility: treeBehavior,
  estimatedItemSize: 50,
};
