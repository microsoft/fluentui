import { Accessibility, treeBehavior, TreeBehaviorProps } from '@fluentui/accessibility';
import {
  getNextElement,
  useAutoControlled,
  useTelemetry,
  useUnhandledProps,
  getElementType,
  useAccessibility,
  useStyles,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Ref } from '@fluentui/react-component-ref';
import TreeItem, { TreeItemProps } from './TreeItem';
import TreeTitle, { TreeTitleProps } from './TreeTitle';
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
  WithAsProp,
  withSafeTypeForAs,
  ShorthandCollection,
  ComponentEventHandler,
  ObjectShorthandCollection,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
import { hasSubtree, removeItemAtIndex, getSiblings, TreeContext, TreeRenderContextValue } from './utils';
// @ts-ignore
import { ThemeContext } from 'react-fela';

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

const Tree: React.FC<WithAsProp<TreeProps>> &
  FluentComponentStaticProps<TreeProps> & {
    Item: typeof TreeItem;
    Title: typeof TreeTitle;
  } = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
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

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Tree.handledProps, props);

  const expandedItemsGenerator = (items, acc = []) =>
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

  const iterateItems = (items, acc = []) =>
    _.reduce(
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

  const [activeItemIds, setActiveItemIdsState] = useAutoControlled({
    defaultValue: props.defaultActiveItemIds,
    value: props.activeItemIds,
    initialValue: expandedItemsGenerator(items),
  });

  const [selectedItemIds, setSelectedItemIdsState] = useAutoControlled({
    defaultValue: props.defaultSelectedItemIds,
    value: props.selectedItemIds,
    initialValue: iterateItems(items),
  });

  const getA11yProps = useAccessibility<TreeBehaviorProps>(props.accessibility, {
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

  const treeRef = React.createRef<HTMLElement>();
  const itemsRef = new Map<string, React.RefObject<HTMLElement>>();

  const onFocusParent = (parent: string) => {
    const parentRef = itemsRef.get(parent);

    if (!parentRef || !parentRef.current) {
      return;
    }

    parentRef.current.focus();
  };

  const setSelectedItemIds = (e: React.SyntheticEvent, selectedItemIds: string[]) => {
    _.invoke(props, 'onSelectedItemIdsChange', e, { ...props, selectedItemIds });

    setSelectedItemIdsState(selectedItemIds);
  };

  const setActiveItemIds = (e: React.SyntheticEvent, activeItemIds: string[]) => {
    _.invoke(props, 'onActiveItemIdsChange', e, { ...props, activeItemIds });

    setActiveItemIdsState(activeItemIds);
  };

  const processItemsForSelection = (
    e: React.SyntheticEvent,
    treeItemProps: TreeItemProps,
    executeSelection: boolean,
  ) => {
    const { id, selectableParent, items, expanded } = treeItemProps;
    const treeItemHasSubtree = hasSubtree(treeItemProps);
    const isExpandedSelectableParent = treeItemHasSubtree && selectableParent && expanded;
    let nextSelectedItemIds = selectedItemIds;

    // parent must be selectable and expanded in order to procced with selection, otherwise return
    if (treeItemHasSubtree && !(selectableParent && expanded)) {
      return;
    }

    // if the target is equal to currentTarget it means treeItem should be collapsed, not procced with selection
    if (treeItemHasSubtree && e.target === e.currentTarget && !executeSelection) {
      return;
    }

    // push all tree items under particular parent into selection array
    // not parent itself, therefore not procced with selection

    if (isExpandedSelectableParent) {
      if (isAllGroupChecked(items)) {
        const selectedItems = getAllSelectableChildrenId(items);
        nextSelectedItemIds = selectedItemIds.filter(id => selectedItems.indexOf(id) === -1);
      } else {
        const selectItems = items => {
          items.forEach(item => {
            const selectble = item.hasOwnProperty('selectable') ? item.selectable : treeItemProps.selectable;
            if (selectedItemIds.indexOf(item.id) === -1) {
              if (item.items) {
                selectItems(item.items);
              } else if (selectble) {
                nextSelectedItemIds.push(item.id);
              }
            }
          });
        };
        selectItems(items);
      }
      setSelectedItemIds(e, [...nextSelectedItemIds]);
      return;
    }

    // push/remove single tree item into selection array
    if (selectedItemIds.indexOf(id) === -1) {
      nextSelectedItemIds = [...selectedItemIds, id];
    } else {
      nextSelectedItemIds = nextSelectedItemIds.filter(itemID => itemID !== id);
    }

    setSelectedItemIds(e, nextSelectedItemIds);
  };

  const onTitleClick = (e: React.SyntheticEvent, treeItemProps: TreeItemProps, executeSelection: boolean = false) => {
    const treeItemHasSubtree = hasSubtree(treeItemProps);

    if (!treeItemProps) {
      return;
    }

    if (treeItemProps.selectable) {
      processItemsForSelection(e, treeItemProps, executeSelection);
    }

    if (treeItemHasSubtree && !executeSelection && e.target === e.currentTarget) {
      expandItems(e, treeItemProps);
    }
  };

  const expandItems = (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
    const { id } = treeItemProps;

    const siblings = getSiblings(items, id);

    const activeItemIdIndex = activeItemIds.indexOf(id);
    let nextActiveItemsIds = activeItemIds;

    if (activeItemIdIndex > -1) {
      nextActiveItemsIds = removeItemAtIndex(activeItemIds, activeItemIdIndex);
    } else {
      if (exclusive) {
        siblings.some(sibling => {
          const activeSiblingIdIndex = activeItemIds.indexOf(sibling['id']);
          if (activeSiblingIdIndex > -1) {
            nextActiveItemsIds = removeItemAtIndex(activeItemIds, activeSiblingIdIndex);

            return true;
          }
          return false;
        });
      }

      nextActiveItemsIds = [...nextActiveItemsIds, id];
    }

    setActiveItemIds(e, nextActiveItemsIds);
  };

  const onFocusFirstChild = (itemId: string) => {
    const currentElement = itemsRef.get(itemId);

    if (!currentElement || !currentElement.current) {
      return;
    }

    const elementToBeFocused = getNextElement(treeRef.current, currentElement.current);

    if (!elementToBeFocused) {
      return;
    }

    elementToBeFocused.focus();
  };

  const onSiblingsExpand = (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
    if (exclusive) {
      return;
    }

    const { id } = treeItemProps;

    const siblings = getSiblings(items, id);

    const nextActiveItemsIds = [...activeItemIds];

    siblings.forEach(sibling => {
      if (hasSubtree(sibling) && !isActiveItem(sibling['id'])) {
        nextActiveItemsIds.push(sibling['id']);
      }
    });

    if (hasSubtree(treeItemProps) && !isActiveItem(id)) {
      nextActiveItemsIds.push(id);
    }

    setActiveItemIds(e, nextActiveItemsIds);
  };

  const getAllSelectableChildrenId = items => {
    return items.reduce((acc, item) => {
      if (item.items) {
        return [...acc, ...getAllSelectableChildrenId(item.items)];
      }
      return item.hasOwnProperty('selectable') && !item.selectable ? acc : [...acc, item.id];
    }, []);
  };

  const isIndeterminate = (item: TreeItemProps) => {
    if (!item.selectableParent || !item.items) {
      return false;
    }

    const { items } = item;

    const selectableItemIds = getAllSelectableChildrenId(items);

    return !isAllGroupChecked(items) && selectableItemIds.some(id => selectedItemIds.indexOf(id) > -1);
  };

  const isAllGroupChecked = (items: ShorthandCollection<TreeItemProps, never>) => {
    const selectableItemIds = getAllSelectableChildrenId(items);
    return selectableItemIds.every(id => selectedItemIds.indexOf(id) > -1);
  };

  const isSelectedItem = (item: TreeItemProps): boolean => {
    if (item.selectableParent && item.items) {
      return isAllGroupChecked(item.items);
    }

    return selectedItemIds && selectedItemIds.indexOf(item.id) > -1;
  };

  const contextValue: TreeRenderContextValue = {
    onFocusParent,
    onSiblingsExpand,
    onFocusFirstChild,
    onTitleClick,
  };

  const renderContent = (): React.ReactElement[] => {
    if (!items) return null;

    const renderItems = (items: TreeItemProps[], level = 1, parent?: string): React.ReactElement[] => {
      return items.reduce((renderedItems: React.ReactElement[], item: TreeItemProps, index: number) => {
        const id = item.id;
        const isSubtree = hasSubtree(item);
        const isSubtreeExpanded = isSubtree && isActiveItem(id);

        const indeterminate = isIndeterminate(item);

        if (!itemsRef.has(id)) {
          itemsRef.set(id, React.createRef<HTMLElement>());
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
              contentRef: itemsRef.get(id),
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

  const isActiveItem = (id: string): boolean => {
    return activeItemIds.indexOf(id) > -1;
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

/**
 * A Tree displays data organised in tree hierarchy.
 *
 * @accessibility
 * Implements [ARIA TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) design pattern.
 * @accessibilityIssues
 * [Treeview - JAWS doesn't narrate position for each tree item](https://github.com/FreedomScientific/VFO-standards-support/issues/338)
 * [Aria compliant trees are read as empty tables](https://bugs.chromium.org/p/chromium/issues/detail?id=1048770)
 */

export default withSafeTypeForAs<typeof Tree, TreeProps, 'ul'>(Tree);
