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
  ShorthandFactory
} from '../../utils';
import {
  ShorthandRenderFunction,
  WithAsProp,
  withSafeTypeForAs,
  ShorthandCollection,
  ShorthandValue,
  ComponentEventHandler
} from '../../types';
import { hasSubtree, removeItemAtIndex, TreeItemContext, TreeItemRenderContextValue } from './utils';

export interface TreeSlotClassNames {
  item: string;
}

export interface TreeProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

  /** Ids of expanded items. */
  activeItemIds?: string[];

  /** Initial activeItemIds value. */
  defaultActiveItemIds?: string[];

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
   * Callback that provides rendered tree items to be used by react-virtualized for instance.
   * Acts as a render prop, with the rendered tree items being the re-used logic.
   *
   * @param renderedItem - The array of rendered items.
   * @returns The render prop result.
   */
  renderedItems?: (renderedItems: React.ReactElement[]) => React.ReactNode;
}

export interface TreeItemForRenderProps {
  elementRef: React.RefObject<HTMLElement>;
  id: string;
  index: number;
  level: number;
  parentRef: React.RefObject<HTMLElement>;
  siblings: ShorthandCollection<TreeItemProps>;
}

export interface TreeState {
  activeItemIds: string[];
  itemsForRender: Record<string, TreeItemForRenderProps>;
}

class Tree extends AutoControlledComponent<WithAsProp<TreeProps>, TreeState> {
  static create: ShorthandFactory<TreeProps>;

  static displayName = 'Tree';

  static className = 'ui-tree';

  static slotClassNames: TreeSlotClassNames = {
    item: `${Tree.className}__item`
  };

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false
    }),
    activeItemIds: customPropTypes.collectionShorthand,
    defaultActiveItemIds: customPropTypes.collectionShorthand,
    exclusive: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    onActiveItemIdsChange: PropTypes.func,
    renderItemTitle: PropTypes.func,
    renderedItems: PropTypes.func
  };

  static defaultProps = {
    as: 'div',
    accessibility: treeBehavior as Accessibility
  };

  static autoControlledProps = ['activeItemIds'];

  static Item = TreeItem;
  static Title = TreeTitle;

  // memoize this function if performance issue occurs.
  static getItemsForRender = (itemsFromProps: ShorthandCollection<TreeItemProps>) => {
    const itemsForRenderGenerator = (items = itemsFromProps, level = 1, parentRef?: React.RefObject<HTMLElement>) => {
      return _.reduce(
        items,
        (acc: Object, item: ShorthandValue<TreeItemProps>, index: number) => {
          const id = item['id'];
          const isSubtree = hasSubtree(item);
          const elementRef = React.createRef<HTMLElement>();

          acc[id] = {
            elementRef,
            parentRef,
            level,
            index: index + 1, // Used for aria-posinset and it's 1-based.
            siblings: items.filter(currentItem => currentItem !== item)
          };

          return {
            ...acc,
            ...(isSubtree ? itemsForRenderGenerator(item['items'], level + 1, elementRef) : {})
          };
        },
        {}
      );
    };

    return itemsForRenderGenerator(itemsFromProps);
  };

  static getAutoControlledStateFromProps(nextProps: TreeProps, prevState: TreeState) {
    const { items } = nextProps;
    const itemsForRender = Tree.getItemsForRender(items);
    let { activeItemIds } = nextProps;

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
          acc
        );

      expandedItemsGenerator(items);
    }

    return {
      activeItemIds,
      itemsForRender
    };
  }

  getInitialAutoControlledState() {
    return { activeItemIds: [] };
  }

  treeRef = React.createRef<HTMLElement>();

  handleTreeItemOverrides = (predefinedProps: TreeItemProps) => ({
    onTitleClick: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      if (!hasSubtree(treeItemProps)) {
        return;
      }

      let { activeItemIds } = this.state;
      const { id, siblings } = treeItemProps;
      const { exclusive } = this.props;

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

      _.invoke(predefinedProps, 'onTitleClick', e, treeItemProps);
    }
  });

  setActiveItemIds = (e: React.SyntheticEvent, activeItemIds: string[]) => {
    _.invoke(this.props, 'onActiveItemIdsChange', e, { ...this.props, activeItemIds });

    this.setState({
      activeItemIds
    });
  };

  onFocusFirstChild = (itemId: string) => {
    const { itemsForRender } = this.state;
    const currentElement = itemsForRender[itemId].elementRef;

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
    if (this.props.exclusive) {
      return;
    }

    const { id: itemId } = treeItemProps;
    const { activeItemIds, itemsForRender } = this.state;
    const siblings = itemsForRender[itemId].siblings;

    siblings.forEach(sibling => {
      if (hasSubtree(sibling) && !this.isActiveItem(sibling['id'])) {
        activeItemIds.push(sibling['id']);
      }
    });

    if (hasSubtree(treeItemProps) && !this.isActiveItem(itemId)) {
      activeItemIds.push(itemId);
    }

    this.setActiveItemIds(e, activeItemIds);
  };
  onFocusParent = (itemId: string) => {
    const { parentRef } = this.state.itemsForRender[itemId];

    if (!parentRef || !parentRef.current) {
      return;
    }

    parentRef.current.focus();
  };

  contextValue: TreeItemRenderContextValue = {
    onFocusParent: this.onFocusParent,
    onSiblingsExpand: this.onSiblingsExpand,
    onFocusFirstChild: this.onFocusFirstChild
  };

  renderContent(accessibility: ReactAccessibilityBehavior): React.ReactElement[] {
    const { itemsForRender } = this.state;
    const { items, renderItemTitle } = this.props;

    if (!items) return null;

    const renderItems = (items: ShorthandCollection<TreeItemProps>): React.ReactElement[] => {
      return items.reduce((renderedItems: React.ReactElement[], item: ShorthandValue<TreeItemProps>) => {
        const itemId = item['id'];
        const itemForRender = itemsForRender[itemId];
        const { elementRef, ...restItemForRender } = itemForRender;
        const isSubtree = hasSubtree(item);
        const isSubtreeExpanded = isSubtree && this.isActiveItem(itemId);
        const renderedItem = (
          <Ref innerRef={elementRef}>
            {TreeItem.create(item, {
              defaultProps: () => ({
                accessibility: accessibility.childBehaviors ? accessibility.childBehaviors.item : undefined,
                className: Tree.slotClassNames.item,
                expanded: isSubtreeExpanded,
                renderItemTitle,
                key: item['id'],
                contentRef: elementRef,
                ...restItemForRender
              }),
              overrideProps: this.handleTreeItemOverrides
            })}
          </Ref>
        );

        return [...renderedItems, renderedItem, ...(isSubtreeExpanded ? renderItems(item['items']) : ([] as any))];
      }, []);
    };

    return renderItems(items);
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children, renderedItems } = this.props;

    return (
      <TreeItemContext.Provider value={this.contextValue}>
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
      </TreeItemContext.Provider>
    );
  }

  isActiveItem = (id: string): boolean => {
    const { activeItemIds } = this.state;
    return activeItemIds.indexOf(id) > -1;
  };
}

Tree.create = createShorthandFactory({
  Component: Tree,
  mappedArrayProp: 'items'
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
