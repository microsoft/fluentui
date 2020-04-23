import { Accessibility, treeBehavior } from '@fluentui/accessibility';
import { ReactAccessibilityBehavior, getNextElement } from '@fluentui/react-bindings';
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
  applyAccessibilityKeyHandlers,
  AutoControlledComponent,
  ShorthandFactory,
} from '../../utils';
import {
  ShorthandRenderFunction,
  WithAsProp,
  withSafeTypeForAs,
  ShorthandCollection,
  ComponentEventHandler,
} from '../../types';
import { hasSubtree, removeItemAtIndex, getSiblings, TreeContext, TreeRenderContextValue } from './utils';

export interface TreeProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

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
  items?: ShorthandCollection<TreeItemProps>;

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

export interface TreeState {
  activeItemIds: string[];
  selectedItemIds: string[];
}

export const treeClassName = 'ui-tree';

class Tree extends AutoControlledComponent<WithAsProp<TreeProps>, TreeState> {
  static create: ShorthandFactory<TreeProps>;

  static displayName = 'Tree';

  static deprecated_className = treeClassName;

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    activeItemIds: customPropTypes.collectionShorthand,
    selectedItemIds: customPropTypes.collectionShorthand,
    defaultActiveItemIds: customPropTypes.collectionShorthand,
    defaultSelectedItemIds: customPropTypes.collectionShorthand,
    exclusive: PropTypes.bool,
    selectable: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    onActiveItemIdsChange: PropTypes.func,
    onSelectedItemIdsChange: PropTypes.func,
    renderItemTitle: PropTypes.func,
    renderedItems: PropTypes.func,
  };

  static defaultProps = {
    as: 'div',
    accessibility: treeBehavior as Accessibility,
  };

  static autoControlledProps = ['activeItemIds', 'selectedItemIds'];

  static Item: typeof TreeItem = TreeItem;
  static Title: typeof TreeTitle = TreeTitle;

  static getAutoControlledStateFromProps(nextProps: TreeProps, prevState: TreeState) {
    const { items, selectable } = nextProps;
    let { activeItemIds, selectedItemIds } = nextProps;

    if (selectable && items && !selectedItemIds) {
      if (!selectedItemIds && items) {
        selectedItemIds = prevState.selectedItemIds;

        const iterateItems = (items, selectedItems = selectedItemIds) => {
          _.forEach(items, item => {
            if (item['selected'] && selectedItemIds.indexOf(item['id']) === -1) {
              selectedItems.push(item['id']);
            }
            if (item['items']) {
              return iterateItems(item['items']);
            }
          });
        };

        iterateItems(items);
      }
    }

    if (!activeItemIds && items) {
      activeItemIds = prevState.activeItemIds;

      const expandedItemsGenerator = (items, acc = activeItemIds) =>
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

      expandedItemsGenerator(items);
    }

    return {
      activeItemIds,
      selectedItemIds,
    };
  }

  getInitialAutoControlledState() {
    return { activeItemIds: [], selectedItemIds: [] };
  }

  treeRef = React.createRef<HTMLElement>();
  itemsRef = new Map<string, React.RefObject<HTMLElement>>();

  onFocusParent = (parent: string) => {
    const parentRef = this.itemsRef.get(parent);

    if (!parentRef || !parentRef.current) {
      return;
    }

    parentRef.current.focus();
  };

  setSelectedItemIds = (e: React.SyntheticEvent, selectedItemIds: string[]) => {
    _.invoke(this.props, 'onSelectedItemIdsChange', e, { ...this.props, selectedItemIds });

    this.setState({
      selectedItemIds,
    });
  };

  processItemsForSelection = (e: React.SyntheticEvent, treeItemProps: TreeItemProps, executeSelection: boolean) => {
    let { selectedItemIds } = this.state;
    const { id, selectableParent, items, expanded } = treeItemProps;
    const treeItemHasSubtree = hasSubtree(treeItemProps);
    const isExpandedSelectableParent = treeItemHasSubtree && selectableParent && expanded;

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
      if (this.isAllGroupChecked(items)) {
        const selectedItems = this.getAllSelectableChildrenId(items);
        selectedItemIds = selectedItemIds.filter(id => selectedItems.indexOf(id) === -1);
      } else {
        const selectItems = items => {
          items.forEach(item => {
            const selectble = item.hasOwnProperty('selectable') ? item.selectable : treeItemProps.selectable;
            if (selectedItemIds.indexOf(item.id) === -1) {
              if (item.items) {
                selectItems(item.items);
              } else if (selectble) {
                selectedItemIds.push(item.id);
              }
            }
          });
        };
        selectItems(items);
      }

      this.setSelectedItemIds(e, selectedItemIds);
      return;
    }

    // push/remove single tree item into selection array
    if (selectedItemIds.indexOf(id) === -1) {
      selectedItemIds.push(id);
    } else {
      selectedItemIds = selectedItemIds.filter(itemID => itemID !== id);
    }

    this.setSelectedItemIds(e, selectedItemIds);
  };

  onTitleClick = (e: React.SyntheticEvent, treeItemProps: TreeItemProps, executeSelection: boolean = false) => {
    const treeItemHasSubtree = hasSubtree(treeItemProps);

    if (!treeItemProps) {
      return;
    }

    if (treeItemProps.selectable) {
      this.processItemsForSelection(e, treeItemProps, executeSelection);
    }

    if (treeItemHasSubtree && !executeSelection && e.target === e.currentTarget) {
      this.expandItems(e, treeItemProps);
    }
  };

  expandItems(e: React.SyntheticEvent, treeItemProps: TreeItemProps) {
    let { activeItemIds } = this.state;
    const { id } = treeItemProps;
    const { exclusive, items } = this.props;
    const siblings = getSiblings(items, id);

    const activeItemIdIndex = activeItemIds.indexOf(id);

    if (activeItemIdIndex > -1) {
      activeItemIds = removeItemAtIndex(activeItemIds, activeItemIdIndex);
    } else {
      if (exclusive) {
        siblings.some(sibling => {
          const activeSiblingIdIndex = activeItemIds.indexOf(sibling['id']);
          if (activeSiblingIdIndex > -1) {
            activeItemIds = removeItemAtIndex(activeItemIds, activeSiblingIdIndex);

            return true;
          }
          return false;
        });
      }

      activeItemIds = [...activeItemIds, id];
    }

    this.setActiveItemIds(e, activeItemIds);
  }

  onFocusFirstChild = (itemId: string) => {
    const currentElement = this.itemsRef.get(itemId);

    if (!currentElement || !currentElement.current) {
      return;
    }

    const elementToBeFocused = getNextElement(this.treeRef.current, currentElement.current);

    if (!elementToBeFocused) {
      return;
    }

    elementToBeFocused.focus();
  };

  onSiblingsExpand = (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
    const { exclusive, items } = this.props;
    if (exclusive) {
      return;
    }

    const { id } = treeItemProps;
    const { activeItemIds } = this.state;
    const siblings = getSiblings(items, id);

    siblings.forEach(sibling => {
      if (hasSubtree(sibling) && !this.isActiveItem(sibling['id'])) {
        activeItemIds.push(sibling['id']);
      }
    });

    if (hasSubtree(treeItemProps) && !this.isActiveItem(id)) {
      activeItemIds.push(id);
    }

    this.setActiveItemIds(e, activeItemIds);
  };

  setActiveItemIds = (e: React.SyntheticEvent, activeItemIds: string[]) => {
    _.invoke(this.props, 'onActiveItemIdsChange', e, { ...this.props, activeItemIds });

    this.setState({
      activeItemIds,
    });
  };

  getAllSelectableChildrenId = items => {
    return items.reduce((acc, item) => {
      if (item.items) {
        return [...acc, ...this.getAllSelectableChildrenId(item.items)];
      }
      return item.hasOwnProperty('selectable') && !item.selectable ? acc : [...acc, item.id];
    }, []);
  };

  isIndeterminate = (item: TreeItemProps) => {
    if (!item.selectableParent || !item.items) {
      return false;
    }

    const { items } = item;

    const selectableItemIds = this.getAllSelectableChildrenId(items);

    return !this.isAllGroupChecked(items) && selectableItemIds.some(id => this.state.selectedItemIds.indexOf(id) > -1);
  };

  isAllGroupChecked = (items: ShorthandCollection<TreeItemProps, never>) => {
    const selectableItemIds = this.getAllSelectableChildrenId(items);
    return selectableItemIds.every(id => this.state.selectedItemIds.indexOf(id) > -1);
  };

  contextValue: TreeRenderContextValue = {
    onFocusParent: this.onFocusParent,
    onSiblingsExpand: this.onSiblingsExpand,
    onFocusFirstChild: this.onFocusFirstChild,
    onTitleClick: this.onTitleClick,
  };

  renderContent(accessibility: ReactAccessibilityBehavior): React.ReactElement[] {
    const { items, renderItemTitle, selectable } = this.props;

    if (!items) return null;

    const renderItems = (items: TreeItemProps[], level = 1, parent?: string): React.ReactElement[] => {
      return items.reduce((renderedItems: React.ReactElement[], item: TreeItemProps, index: number) => {
        const { id } = item;
        const isSubtree = hasSubtree(item);
        const isSubtreeExpanded = isSubtree && this.isActiveItem(id);
        const isSelectedItem = this.isSelectedItem(item);
        const indeterminate = this.isIndeterminate(item);

        if (!this.itemsRef.has(id)) {
          this.itemsRef.set(id, React.createRef<HTMLElement>());
        }

        const renderedItem = TreeItem.create(item, {
          defaultProps: () => ({
            accessibility: accessibility.childBehaviors ? accessibility.childBehaviors.item : undefined,
            expanded: isSubtreeExpanded,
            selected: isSelectedItem,
            selectable,
            renderItemTitle,
            key: id,
            parent,
            level,
            index: index + 1, // Used for aria-posinset and it's 1-based.
            contentRef: this.itemsRef.get(id),
            treeSize: items.length,
            indeterminate,
          }),
        });

        return [
          ...renderedItems,
          renderedItem,
          ...(isSubtreeExpanded ? renderItems(item.items as TreeItemProps[], level + 1, id) : ([] as any)),
        ];
      }, []);
    };

    return renderItems(items as TreeItemProps[]);
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children, renderedItems } = this.props;

    return (
      <TreeContext.Provider value={this.contextValue}>
        <Ref innerRef={this.treeRef}>
          <ElementType
            className={classes.root}
            {...accessibility.attributes.root}
            {...rtlTextContainer.getAttributes({ forElements: [children] })}
            {...unhandledProps}
            {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
          >
            {childrenExist(children)
              ? children
              : renderedItems
              ? renderedItems(this.renderContent(accessibility))
              : this.renderContent(accessibility)}
          </ElementType>
        </Ref>
      </TreeContext.Provider>
    );
  }

  isActiveItem = (id: string): boolean => {
    const { activeItemIds } = this.state;
    return activeItemIds.indexOf(id) > -1;
  };

  isSelectedItem = (item: TreeItemProps): boolean => {
    const { selectedItemIds } = this.state;

    if (item.selectableParent && item.items) {
      return this.isAllGroupChecked(item.items);
    }

    return selectedItemIds && selectedItemIds.indexOf(item.id) > -1;
  };
}

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
