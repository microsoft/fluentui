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
} from '@fluentui/react-northstar';
import { TreeContext, TreeRenderContextValue } from '@fluentui/react-northstar/src/components/Tree/context';
import { VariableSizeList } from 'react-window';
import { useVirtualTree } from './useVirtualTree';

export interface VirtualTreeProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<TreeBehaviorProps>;

  /** Ids of expanded items. */
  activeItemIds?: string[];

  /** Initial activeItemIds value. */
  defaultActiveItemIds?: string[];

  /** Only allow one subtree to be expanded at a time. */
  exclusive?: boolean;

  /** Shorthand array of props for Tree. */
  items?: ObjectShorthandCollection<TreeItemProps>;

  /**
   * A custom render function for the title slot.
   *
   * @param Component - The computed component for this slot.
   * @param props - The computed props for this slot.
   * @param children - The computed children for this slot.
   */
  renderItemTitle?: ShorthandRenderFunction<TreeTitleProps>;

  height: number;
  estimatedItemSize: number;
  itemSize: (index: number) => number;
}

export interface VirtualItemData {
  visibleItemIds: string[];
  createTreeItem: (id, style) => React.ReactElement<TreeItemProps> | null;
}

export const virtualTreeClassName = 'ui-virtualtree';

export interface VirtualItemData {
  visibleItemIds: string[];
  createTreeItem: (id: string, style: React.CSSProperties) => React.ReactElement<TreeItemProps> | null;
}

export const VirtualTree: ComponentWithAs<'div', VirtualTreeProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(VirtualTree.displayName, context.telemetry);
  setStart();

  const { children, className, design, styles, variables, height, estimatedItemSize, itemSize } = props;

  const ElementType = getElementType(props);

  const unhandledProps = useUnhandledProps(Tree.handledProps, props);

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

  const getItemKey = React.useCallback(
    (index: number, data: VirtualItemData) => {
      const { visibleItemIds } = data;
      const id = visibleItemIds[index];
      if (getItemById(id)) {
        return id;
      }
      return index;
    },
    [getItemById],
  );

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
            style,
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
            ref={listRef}
            height={height}
            estimatedItemSize={estimatedItemSize}
            itemSize={itemSize}
            itemKey={getItemKey}
            itemData={{ visibleItemIds, createTreeItem }}
            itemCount={visibleItemIds.length}
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

class ItemWrapper extends React.PureComponent<{
  index: number;
  isScrolling?: boolean;
  style: Object;
  data: VirtualItemData;
}> {
  render() {
    const { index, style, data } = this.props;
    const { visibleItemIds, createTreeItem } = data;
    return createTreeItem(visibleItemIds[index], style);
  }
}

VirtualTree.displayName = 'VirtualTree';

VirtualTree.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  activeItemIds: customPropTypes.collectionShorthand,
  defaultActiveItemIds: customPropTypes.collectionShorthand,
  items: customPropTypes.collectionObjectShorthand,
  renderItemTitle: PropTypes.func,
  height: PropTypes.number,
  estimatedItemSize: PropTypes.number,
  itemSize: PropTypes.func,
};

VirtualTree.Item = TreeItem;
VirtualTree.Title = TreeTitle;

VirtualTree.defaultProps = {
  accessibility: treeBehavior,
  estimatedItemSize: 50,
};
