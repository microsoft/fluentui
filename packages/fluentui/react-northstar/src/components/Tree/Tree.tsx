import { Accessibility, treeBehavior, TreeBehaviorProps } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getNextElement,
  useAutoControlled,
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
import * as React from 'react';
import { Ref } from '@fluentui/react-component-ref';
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
  ShorthandRenderFunction,
  ShorthandCollection,
  ComponentEventHandler,
  ObjectShorthandCollection,
  FluentComponentStaticProps,
} from '../../types';
import {
  getAllSelectableChildrenId,
  isAllGroupChecked,
  hasSubtree,
  removeItemAtIndex,
  getSiblings,
  TreeContext,
  TreeRenderContextValue,
  processItemsForSelection,
} from './utils';

export interface TreeProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<TreeBehaviorProps>;

  /** Ids of expanded items. */
  activeItemIds?: string[];

  /** Ids of selected items. */
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

export interface TreeItemForRenderProps {
  elementRef: React.RefObject<HTMLElement>;
  id: string;
  index: number;
  level: number;
  parent: string;
  siblings: ShorthandCollection<TreeItemProps>;
}

export const treeClassName = 'ui-tree';

export type TreeStylesProps = never;

function useStableProps<P>(props: P) {
  const stableProps = React.useRef<P>(props);

  React.useEffect(() => {
    stableProps.current = props;
  });

  return stableProps;
}

const expandedItemsGenerator = (items: TreeProps['items'] | TreeItemProps['items'], acc = []) =>
  _.reduce(
    items,
    (acc, item) => {
      if (item['expanded'] && acc.indexOf(item['id']) === -1) {
        acc.push(item['id']);
      }

      if (item['items']) {
        return expandedItemsGenerator(item['items'], acc);
      }

      return acc;
    },
    acc,
  );

const iterateItems = (items: TreeProps['items'] | TreeItemProps['items'], acc = []): string[] =>
  _.reduce<TreeProps['items'] | TreeItemProps['items'], string[]>(
    items,
    (acc, item) => {
      if (item['selected'] && acc.indexOf(item['id']) === -1) {
        acc.push(item['id']);
      }

      if (item['items']) {
        return iterateItems(item['items']);
      }

      return acc;
    },
    acc,
  );

/**
 * A Tree displays data organised in tree hierarchy.
 *
 * @accessibility
 * Implements [ARIA TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) design pattern.
 * @accessibilityIssues
 * [Treeview - JAWS doesn't narrate position for each tree item](https://github.com/FreedomScientific/VFO-standards-support/issues/338)
 * [Aria-selected and aria-checked are not output correctly for trees #432](https://github.com/FreedomScientific/VFO-standards-support/issues/432)
 * [Aria compliant trees are read as empty tables](https://bugs.chromium.org/p/chromium/issues/detail?id=1048770)
 */
export const Tree: ComponentWithAs<'div', TreeProps> &
  FluentComponentStaticProps<TreeProps> & {
    Item: typeof TreeItem;
    Title: typeof TreeTitle;
  } = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Tree.displayName, context.telemetry);
  setStart();

  const {
    exclusive,
    items,
    renderItemTitle,
    selectable,
    children,
    renderedItems,
    className,
    design,
    styles,
    variables,
  } = props;
  const stableProps = useStableProps(props);

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Tree.handledProps, props);

  const [activeItemIds, setActiveItemIdsState] = useAutoControlled<string[]>({
    defaultValue: props.defaultActiveItemIds,
    value: props.activeItemIds,
    initialValue: expandedItemsGenerator(items),
  });

  const [selectedItemIds, setSelectedItemIdsState] = useAutoControlled<string[]>({
    defaultValue: props.defaultSelectedItemIds,
    value: props.selectedItemIds,
    initialValue: iterateItems(items),
  });

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Tree.displayName,
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

  const treeRef = React.useRef<HTMLElement>();
  const itemsRef = React.useRef(new Map<string, React.RefObject<HTMLElement>>());

  const onFocusParent = React.useCallback(
    (parent: string) => {
      const parentRef = itemsRef.current.get(parent);

      if (!parentRef || !parentRef.current) {
        return;
      }

      parentRef.current.focus();
    },
    [itemsRef],
  );

  const setSelectedItemIds = React.useCallback(
    (e: React.SyntheticEvent, updateSelectedItemIds: (currSelectedItemIds: string[]) => string[]) => {
      setSelectedItemIdsState(prevSelectedItemIds => {
        const nextSelectedItemIds = updateSelectedItemIds(prevSelectedItemIds);

        _.invoke(stableProps.current, 'onSelectedItemIdsChange', e, {
          ...stableProps.current,
          selectedItemIds: nextSelectedItemIds,
        });

        return nextSelectedItemIds;
      });
    },
    [stableProps, setSelectedItemIdsState],
  );

  const setActiveItemIds = React.useCallback(
    (e: React.SyntheticEvent, updateActiveItemIds: (activeItemIds: string[]) => string[]) => {
      setActiveItemIdsState(prevActiveItemIds => {
        const nextActiveItemIds = updateActiveItemIds(prevActiveItemIds);
        _.invoke(stableProps.current, 'onActiveItemIdsChange', e, {
          ...stableProps.current,
          activeItemIds: nextActiveItemIds,
        });
        return nextActiveItemIds;
      });
    },
    [stableProps, setActiveItemIdsState],
  );

  const expandItems = React.useCallback(
    (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { id } = treeItemProps;

      setActiveItemIds(e, currActiveItemIds => {
        const siblings = getSiblings(stableProps.current.items, id);
        const activeItemIdIndex = currActiveItemIds.indexOf(id);
        let nextActiveItemsIds = currActiveItemIds;
        if (activeItemIdIndex > -1) {
          nextActiveItemsIds = removeItemAtIndex(currActiveItemIds, activeItemIdIndex);
        } else {
          if (exclusive) {
            siblings.some(sibling => {
              const activeSiblingIdIndex = currActiveItemIds.indexOf(sibling['id']);
              if (activeSiblingIdIndex > -1) {
                nextActiveItemsIds = removeItemAtIndex(currActiveItemIds, activeSiblingIdIndex);
                return true;
              }
              return false;
            });
          }
          nextActiveItemsIds = [...nextActiveItemsIds, id];
        }
        return nextActiveItemsIds;
      });
    },
    [stableProps, setActiveItemIds, exclusive],
  );

  const onTitleClick = React.useCallback(
    (e: React.SyntheticEvent, treeItemProps: TreeItemProps, executeSelection: boolean = false) => {
      const treeItemHasSubtree = hasSubtree(treeItemProps);
      if (!treeItemProps) {
        return;
      }

      if (treeItemHasSubtree && e.target === e.currentTarget && !executeSelection) {
        expandItems(e, treeItemProps);
      }

      if (treeItemProps.selectable) {
        // parent must be selectable and expanded in order to procced with selection, otherwise return
        if (treeItemHasSubtree && !treeItemProps.selectableParent) {
          return;
        }

        // if the target is equal to currentTarget it means treeItem should be collapsed, not procced with selection
        if (treeItemHasSubtree && e.target === e.currentTarget && !executeSelection) {
          return;
        }

        setSelectedItemIds(e, currSelectedItemIds => processItemsForSelection(treeItemProps, currSelectedItemIds));
      }
    },
    [expandItems, setSelectedItemIds],
  );

  const onFocusFirstChild = React.useCallback(
    (itemId: string) => {
      const currentElement = itemsRef.current.get(itemId);

      if (!currentElement || !currentElement.current) {
        return;
      }

      const elementToBeFocused = getNextElement(treeRef.current, currentElement.current);

      if (!elementToBeFocused) {
        return;
      }

      elementToBeFocused.focus();
    },
    [treeRef, itemsRef],
  );

  const isActiveItem = React.useCallback(
    (id: string): boolean => {
      return activeItemIds.indexOf(id) > -1;
    },
    [activeItemIds],
  );

  const onSiblingsExpand = React.useCallback(
    (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      if (exclusive) {
        return;
      }

      const { id } = treeItemProps;
      const siblings = getSiblings(stableProps.current.items, id);

      setActiveItemIds(e, currActiveItemIds => {
        const nextActiveItemsIds = [...currActiveItemIds];

        siblings.forEach(sibling => {
          if (hasSubtree(sibling) && !isActiveItem(sibling['id'])) {
            nextActiveItemsIds.push(sibling['id']);
          }
        });

        if (hasSubtree(treeItemProps) && !isActiveItem(id)) {
          nextActiveItemsIds.push(id);
        }
        return nextActiveItemsIds;
      });
    },
    [exclusive, stableProps, isActiveItem, setActiveItemIds],
  );

  const isIndeterminate = (item: TreeItemProps) => {
    if (!item.selectableParent || !item.items) {
      return false;
    }

    const selectableItemIds = getAllSelectableChildrenId(item.items as TreeItemProps[]);

    return (
      !isAllGroupChecked(item.items as TreeItemProps[], selectedItemIds) &&
      selectableItemIds.some(id => selectedItemIds.indexOf(id) > -1)
    );
  };

  const isSelectedItem = (item: TreeItemProps): boolean => {
    if (item.selectableParent && item.items) {
      return isAllGroupChecked(item.items as TreeItemProps[], selectedItemIds);
    }

    return selectedItemIds && selectedItemIds.indexOf(item.id) > -1;
  };

  const contextValue: TreeRenderContextValue = React.useMemo(
    () => ({
      onFocusParent,
      onSiblingsExpand,
      onFocusFirstChild,
      onTitleClick,
    }),
    [onFocusParent, onSiblingsExpand, onFocusFirstChild, onTitleClick],
  );

  const renderContent = (): React.ReactElement[] => {
    if (!items) return null;

    const renderItems = (items: TreeItemProps[], level = 1, parent?: string): React.ReactElement[] => {
      return items.reduce((renderedItems: React.ReactElement[], item: TreeItemProps, index: number) => {
        const id = item.id;
        const isSubtree = hasSubtree(item);
        const isSubtreeExpanded = isSubtree && isActiveItem(id);

        const indeterminate = isIndeterminate(item);

        if (!itemsRef.current.has(id)) {
          itemsRef.current.set(id, React.createRef<HTMLElement>());
        }

        const renderedItem = TreeItem.create(item, {
          defaultProps: () =>
            getA11yProps('item', {
              expanded: isSubtreeExpanded,
              selected: isSelectedItem(item),
              selectable,
              renderItemTitle,
              id,
              key: id,
              parent,
              level,
              index: index + 1, // Used for aria-posinset and it's 1-based.
              contentRef: itemsRef.current.get(id),
              treeSize: items.length,
              indeterminate,
              onSiblingsExpand,
            }),
        });

        return [
          ...renderedItems,
          renderedItem,
          ...(isSubtreeExpanded ? renderItems(item.items as TreeItemProps[], level + 1, id) : ([] as any)),
        ];
      }, []);
    };
    const itemsRendered = renderItems(items as TreeItemProps[]);

    return itemsRendered;
  };

  const element = (
    <TreeContext.Provider value={contextValue}>
      <Ref innerRef={treeRef}>
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
      </Ref>
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
