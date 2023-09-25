import { Accessibility, treeBehavior, TreeBehaviorProps } from '@fluentui/accessibility';
import {
  useTelemetry,
  useUnhandledProps,
  getElementType,
  useAccessibility,
  useStyles,
  useFluentContext,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { TreeItem, TreeItemProps } from './TreeItem';
import { TreeTitle, TreeTitleProps } from './TreeTitle';
import {
  childrenExist,
  commonPropTypes,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
} from '../../utils';
import {
  ComponentEventHandler,
  ObjectShorthandCollection,
  FluentComponentStaticProps,
  ShorthandRenderFunction,
} from '../../types';
import { useTree } from './hooks/useTree';
import { TreeContext, TreeRenderContextValue } from './context';

export interface TreeProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<TreeBehaviorProps>;

  /** Ids of expanded items. */
  activeItemIds?: string[];

  /** Ids of selected leaf items. */
  selectedItemIds?: string[];

  /** Initial activeItemIds value. */
  defaultActiveItemIds?: string[];

  /** Initial selectedItemIds value. */
  defaultSelectedItemIds?: string[];

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

  /**
   * Called when active item ids change.
   * @param event - React's original SyntheticEvent.
   * @param data - All props, with `activeItemIds` reflecting the new state.
   */
  onActiveItemIdsChange?: ComponentEventHandler<TreeProps>;

  /**
   * Called when tree item selection state is changed.
   * @param event - React's original SyntheticEvent.
   * @param data - All props, with `selectedItemIds` reflecting the new state.
   */
  onSelectedItemIdsChange?: ComponentEventHandler<TreeProps>;

  /**
   * Callback that provides rendered tree items to be used by react-virtualized for instance.
   * Acts as a render prop, with the rendered tree items being the re-used logic.
   *
   * @param renderedItem - The array of rendered items.
   * @returns The render prop result.
   */
  renderedItems?: (renderedItems: React.ReactElement[]) => React.ReactNode;

  /** Whether or not tree items are selectable. */
  selectable?: boolean;

  unstyled?: boolean;
}

export const treeClassName = 'ui-tree';

export type TreeStylesProps = never;

/**
 * A Tree displays data organised in tree hierarchy.
 *
 * @accessibility
 * Implements [ARIA TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) design pattern.
 * @accessibilityIssues
 * [Treeview - JAWS doesn't narrate position for each tree item](https://github.com/FreedomScientific/VFO-standards-support/issues/338)
 * [Aria-selected and aria-checked are not output correctly for trees #432](https://github.com/FreedomScientific/VFO-standards-support/issues/432)
 * [Aria compliant trees are read as empty tables](https://bugs.chromium.org/p/chromium/issues/detail?id=1048770)
 * [VoiceOver narrates "selected false" for DOM with role=option and no aria-selected attribute](http://www.openradar.me/FB8050959)
 * [VoiceOver does not support Aria 1.2 listbox role owning unselectable group role](http://www.openradar.me/FB8050958)
 * [Tree as table in Mac > VoiceOver narrates " no selection " when user navigates to tree/table](https://bugs.chromium.org/p/chromium/issues/detail?id=1273538)
 * [Tree as table in Mac > VoiceOver narrates " 0 items enclosed " when user navigates to expaded treeitem](https://bugs.chromium.org/p/chromium/issues/detail?id=1273540)
 * [Tree as table in Mac > VoiceOver doesn't narrate aria-labelledby element on treeitem](https://bugs.chromium.org/p/chromium/issues/detail?id=1273544)
 */
export const Tree = React.forwardRef<HTMLDivElement, TreeProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Tree.displayName, context.telemetry);
  setStart();

  const { selectable, children, renderedItems, className, design, styles, variables } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Tree.handledProps, props);

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Tree.displayName,
    rtl: context.rtl,
    mapPropsToBehavior: () => ({
      selectable,
    }),
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
    unstyled: props.unstyled,
  });

  const {
    visibleItemIds,
    getItemById,
    registerItemRef,
    toggleItemActive,
    focusItemById,
    expandSiblings,
    toggleItemSelect,
    getToFocusIDByFirstCharacter,
  } = useTree(props);

  const contextValue: TreeRenderContextValue = React.useMemo(
    () => ({
      getItemById,
      registerItemRef,
      toggleItemActive,
      expandSiblings,
      focusItemById,
      toggleItemSelect,
      getToFocusIDByFirstCharacter,
    }),
    [
      getItemById,
      registerItemRef,
      toggleItemActive,
      focusItemById,
      expandSiblings,
      toggleItemSelect,
      getToFocusIDByFirstCharacter,
    ],
  );

  const renderContent = (): React.ReactElement[] => {
    return visibleItemIds.map(id => {
      const item = getItemById(id);
      const { expanded, parent, level, index, treeSize } = item;
      return TreeItem.create(item.item, {
        defaultProps: () =>
          getA11yProps('item', {
            renderItemTitle: props.renderItemTitle,
          }),
        overrideProps: {
          expanded,
          parent,
          key: id,
          level,
          index,
          treeSize,
          selectable: selectable ? item.item.selectable : false,
        },
      });
    });
  };

  const element = (
    <TreeContext.Provider value={contextValue}>
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes.root,
            ref,
            ...rtlTextContainer.getAttributes({ forElements: [children] }),
            ...unhandledProps,
          })}
        >
          {childrenExist(children) ? children : renderedItems ? renderedItems(renderContent()) : renderContent()}
        </ElementType>,
      )}
    </TreeContext.Provider>
  );
  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, TreeProps> &
  FluentComponentStaticProps<TreeProps> & {
    Item: typeof TreeItem;
    Title: typeof TreeTitle;
  };

Tree.displayName = 'Tree';

Tree.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  activeItemIds: customPropTypes.collectionShorthand,
  selectedItemIds: customPropTypes.collectionShorthand,
  defaultActiveItemIds: customPropTypes.collectionShorthand,
  defaultSelectedItemIds: customPropTypes.collectionShorthand,
  exclusive: PropTypes.bool,
  selectable: PropTypes.bool,
  unstyled: PropTypes.bool,
  items: customPropTypes.collectionObjectShorthand,
  onActiveItemIdsChange: PropTypes.func,
  onSelectedItemIdsChange: PropTypes.func,
  renderItemTitle: PropTypes.func,
  renderedItems: PropTypes.func,
};

Tree.Item = TreeItem;
Tree.Title = TreeTitle;

Tree.defaultProps = {
  accessibility: treeBehavior,
};

Tree.handledProps = Object.keys(Tree.propTypes) as any;

Tree.create = createShorthandFactory({
  Component: Tree,
  mappedArrayProp: 'items',
});
