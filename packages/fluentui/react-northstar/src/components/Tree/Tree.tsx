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
import { useSelectableTree } from './hooks/useSelectableTree';
import { BaseFlatTreeItem } from './hooks/flattenTree';

export interface TreeRenderContextValue {
  toggleActive: (ids: string[], e: React.SyntheticEvent) => void;
  toggleSelect: (ids: string[], e: React.SyntheticEvent) => void;
  focusFirstChild: (itemId: string) => void;
  focusParent: (itemId: string) => void;
  siblingsExpand: (e: React.SyntheticEvent, itemProps: TreeItemProps) => void;
  registerItemRef: (id: string, node: HTMLElement) => void;
  getItemById: (id: string) => BaseFlatTreeItem & { [key: string]: any };
}

export const TreeContext = React.createContext<TreeRenderContextValue>({
  toggleActive: _.noop,
  toggleSelect: _.noop,
  focusFirstChild: _.noop,
  focusParent: _.noop,
  siblingsExpand: _.noop,
  registerItemRef: _.noop,
  getItemById: id => ({ id } as Partial<BaseFlatTreeItem>),
});

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
 */
export const Tree: ComponentWithAs<'div', TreeProps> &
  FluentComponentStaticProps<TreeProps> & {
    Item: typeof TreeItem;
    Title: typeof TreeTitle;
  } = props => {
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
  });

  const {
    tobeRenderedItemsProps,
    toggleActive,
    focusParent,
    focusFirstChild,
    siblingsExpand,
    registerItemRef,
    toggleSelect,
    getItemById,
  } = useSelectableTree(props);

  const contextValue: TreeRenderContextValue = React.useMemo(
    () => ({
      toggleActive,
      focusParent,
      siblingsExpand,
      focusFirstChild,
      registerItemRef,
      toggleSelect,
      getItemById,
    }),
    [toggleActive, focusParent, siblingsExpand, focusFirstChild, registerItemRef, toggleSelect, getItemById],
  );

  const renderContent = (): React.ReactElement[] => {
    return tobeRenderedItemsProps.map(props =>
      TreeItem.create(
        { id: props.id }, // this is useless. {} would work, but won't pass type check
        {
          defaultProps: () => getA11yProps('item', props),
        },
      ),
    );
  };

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
          {childrenExist(children) ? children : renderedItems ? renderedItems(renderContent()) : renderContent()}
        </ElementType>,
      )}
    </TreeContext.Provider>
  );
  setEnd();
  return element;
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
