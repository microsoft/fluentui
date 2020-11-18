import * as React from 'react';
import { Accessibility, treeBehavior, TreeBehaviorProps } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  useTelemetry,
  useUnhandledProps,
  getElementType,
  useAccessibility,
  useStyles,
  useFluentContext,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import {
  ChildrenComponentProps,
  commonPropTypes,
  createShorthandFactory,
  FluentComponentStaticProps,
  ObjectShorthandCollection,
  rtlTextContainer,
  ShorthandRenderFunction,
  TreeTitle,
  TreeTitleProps,
  UIComponentProps,
  TreeItem,
  TreeItemProps,
  teamsTheme,
} from '@fluentui/react-northstar';
import { TreeContext, TreeRenderContextValue } from '@fluentui/react-northstar/src/components/Tree/context';
import { VariableSizeList } from 'react-window';
import { useVirtualStickyTree, VirtualNonStickyItemData } from './useVirtualStickyTree';

export interface VirtualStickyTreeProps extends UIComponentProps, ChildrenComponentProps {
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
  itemSize: number;
  stickyItemSize: number;
}

export interface InnerElementContextType {
  stickyItemIds: string[];
  stickyItemDescendents: string[][];
  itemSize: number;
  stickyItemSize: number;
  createTreeItem: (id, style) => React.ReactElement<TreeItemProps> | null;
}
export const InnerElementContext = React.createContext<InnerElementContextType>({} as InnerElementContextType);

export const VirtualStickyTreeClassName = 'ui-virtualstickytree';

export type VirtualStickyTreeStylesProps = never;

export const VirtualStickyTree: ComponentWithAs<'div', VirtualStickyTreeProps> &
  FluentComponentStaticProps<VirtualStickyTreeProps> & {
    Item: typeof TreeItem;
    Title: typeof TreeTitle;
  } = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(VirtualStickyTree.displayName, context.telemetry);
  setStart();

  const { children, className, design, styles, variables, height, itemSize, stickyItemSize } = props;

  const ElementType = getElementType(props);

  const unhandledProps = useUnhandledProps(VirtualStickyTree.handledProps, props);

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: VirtualStickyTree.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<VirtualStickyTreeStylesProps>(VirtualStickyTree.displayName, {
    className: VirtualStickyTreeClassName,
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
    getItemSize,
    getItemKey,
    stickyItemIds,
    stickyItemDescendents,
    makeVisibleOnFocus,
  } = useVirtualStickyTree(props);

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
            onFocus: e => makeVisibleOnFocus(id, level),
          },
        });
      }
      return null;
    },
    [getA11yProps, getItemById, makeVisibleOnFocus, props.renderItemTitle],
  );

  const innerElementContextValue: InnerElementContextType = React.useMemo(
    () => ({
      stickyItemIds,
      stickyItemDescendents,
      itemSize,
      stickyItemSize,
      createTreeItem,
    }),
    [stickyItemIds, stickyItemDescendents, itemSize, stickyItemSize, createTreeItem],
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
          <InnerElementContext.Provider value={innerElementContextValue}>
            <VariableSizeList
              ref={listRef}
              height={height}
              itemSize={getItemSize}
              itemKey={getItemKey}
              itemData={{ visibleItemIds, createTreeItem }}
              itemCount={visibleItemIds.length}
              innerElementType={InnerElementType}
            >
              {ItemWrapper}
            </VariableSizeList>
          </InnerElementContext.Provider>
        </ElementType>,
      )}
    </TreeContext.Provider>
  );
  setEnd();
  return element;
};

const InnerElementType = ({ children, style }) => {
  const context = React.useContext(InnerElementContext);
  const { stickyItemIds, stickyItemDescendents, itemSize, stickyItemSize, createTreeItem } = context;

  const isDescendentsOfStickyItem = (child, stickyItemIndex) => {
    const { index, data } = child.props;
    const { visibleItemIds } = data;
    const childId = visibleItemIds[index];

    return stickyItemDescendents[stickyItemIndex].includes(childId);
  };

  return (
    <div style={style}>
      {stickyItemIds.map((id, index) => {
        return (
          <React.Fragment key={index}>
            {createTreeItem(id, {
              height: stickyItemSize,
              zIndex: teamsTheme.siteVariables.zIndexes.overlay,
              position: 'sticky',
              top: index * stickyItemSize,
              bottom: (stickyItemIds.length - index - 1) * stickyItemSize,
              backgroundColor: teamsTheme.siteVariables.colorScheme.default.background3,
            })}
            <div style={{ height: stickyItemDescendents[index].length * itemSize, zIndex: -1 }} aria-hidden="true" />
            {children.filter(child => isDescendentsOfStickyItem(child, index))}
          </React.Fragment>
        );
      })}
    </div>
  );
};

class ItemWrapper extends React.PureComponent<{
  index: number;
  isScrolling?: boolean;
  style: Object;
  data: VirtualNonStickyItemData;
}> {
  render() {
    const { index, style, data } = this.props;
    const { visibleItemIds, createTreeItem } = data;
    return createTreeItem(visibleItemIds[index], style);
  }
}

VirtualStickyTree.displayName = 'VirtualStickyTree';

VirtualStickyTree.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  activeItemIds: customPropTypes.collectionShorthand,
  defaultActiveItemIds: customPropTypes.collectionShorthand,
  items: customPropTypes.collectionObjectShorthand,
  renderItemTitle: PropTypes.func,
  height: PropTypes.number,
  itemSize: PropTypes.number,
  stickyItemSize: PropTypes.number,
};

VirtualStickyTree.Item = TreeItem;
VirtualStickyTree.Title = TreeTitle;

VirtualStickyTree.defaultProps = {
  accessibility: treeBehavior,
  itemSize: 50,
};

VirtualStickyTree.handledProps = Object.keys(VirtualStickyTree.propTypes) as any;

VirtualStickyTree.create = createShorthandFactory({
  Component: VirtualStickyTree,
  mappedArrayProp: 'items',
});
