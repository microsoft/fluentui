import * as React from 'react';
import { VariableSizeList as List } from 'react-window';
import {
  ComponentEventHandler,
  ObjectShorthandCollection,
  Tree,
  TreeItemProps,
  treeTitleClassName,
  teamsTheme,
  Accessibility,
  TreeBehaviorProps,
  AccessibilityAttributes,
} from '@fluentui/react-northstar';
import StickyTreeTitle from './StickyTreeTitle';
import { InnerElementContext, InnerElementContextType } from './context';
import { removeFocusFirstChild } from './virtualizedTreeItemBehavior';

// type for react-window's 'context' for each item
interface ItemDataType {
  renderedItems: React.ReactElement<TreeItemProps>[];
  isNonSticky: (item: React.ReactElement<TreeItemProps>) => boolean;
  onClick: (event: React.MouseEvent<HTMLElement>, itemProps: TreeItemProps) => void;
  makeVisibleOnFocus: (event: React.FocusEvent<HTMLElement>, itemProps: TreeItemProps) => void;
  makeParentVisible: ComponentEventHandler<TreeItemProps>;
  makeFirstChildVisible: ComponentEventHandler<TreeItemProps>;
  retainFocusOnSiblingsExpand: ComponentEventHandler<TreeItemProps>;
}

/**
 * ItemWrapper render only non-sticky items
 */
class ItemWrapper extends React.PureComponent<{
  index: number;
  isScrolling?: boolean;
  style: Object;
  data: ItemDataType;
}> {
  render() {
    const { index, style, data } = this.props;
    const {
      renderedItems,
      isNonSticky,
      onClick,
      makeVisibleOnFocus,
      makeParentVisible,
      retainFocusOnSiblingsExpand,
    } = data;

    const item = renderedItems[index];
    const treeItemBehaviorHandler = {
      onTitleClick: onClick,
      onFocusParent: makeParentVisible,
      onSiblingsExpand: retainFocusOnSiblingsExpand,
    };
    if (item) {
      return isNonSticky(item)
        ? React.cloneElement(item as React.ReactElement, {
            style,
            ...treeItemBehaviorHandler,
            onFocus: e => makeVisibleOnFocus(e, item.props),
          })
        : null;
    }

    return null;
  }
}

const InnerElementType = ({ children, style }) => {
  const context = React.useContext(InnerElementContext);
  const {
    height,
    stickyItemSize,
    stickyTopIds,
    stickyBottomIds,
    onClickSticky,
    itemIdTobeFocused,
    passItemIdTobeFocused,
  } = context;

  // retain focus after items gotten clicked and triggers DOM updates
  React.useEffect(() => {
    if (!itemIdTobeFocused || !renderedItems) return;

    const toFocusIndex = renderedItems.findIndex(item => item.props.id === itemIdTobeFocused);
    if (toFocusIndex < 0) return;
    const toFocus = (renderedItems[toFocusIndex].props.contentRef as any)?.current;

    if (toFocus) {
      toFocus.focus();
      // passItemIdTobeFocused is not called for every focus event.
      // therefore reset ItemIdTobeFocused to null to prevent focus being hold on the current ItemIdTobeFocused
      passItemIdTobeFocused(null);
    }
  });

  if (!children?.length) return null;

  const data: ItemDataType = children[0].props.data;
  const { renderedItems, makeParentVisible, makeFirstChildVisible } = data;

  const stickyTopItemsIndex = stickyTopIds.map(id => renderedItems.findIndex(item => item.props.id === id));
  const stickyBottomItemsIndex = stickyBottomIds.map(id => renderedItems.findIndex(item => item.props.id === id));

  const getStickyStyle = (itemIndex: number, stickyTop = true, itemSum?: number) => {
    // Sticky items are sticked next to container's top or bottom edge,
    // with the smaller-indexed items stacked on bigger-indexed items
    return {
      position: 'sticky',
      height: stickyItemSize,
      zIndex: stickyTop ? teamsTheme.siteVariables.zIndexes.overlay : teamsTheme.siteVariables.zIndexes.overlayPriority,
      top: stickyTop ? itemIndex * stickyItemSize : height - (itemSum - itemIndex) * stickyItemSize,
    };
  };

  const treeItemBehaviorHandler = {
    onTitleClick: onClickSticky,
    onFocusParent: makeParentVisible,
  };

  return (
    <div
      style={{
        ...style,
        height: Math.max(height, style.height),
      }}
    >
      {stickyTopItemsIndex.map((index: number) => {
        const item = renderedItems[index];
        return React.cloneElement(item as React.ReactElement, {
          style: getStickyStyle(index),
          ...treeItemBehaviorHandler,
          // override default treeItem behavior, in order to not execute treeItem's onFocusFirstChild logic
          accessibility: removeFocusFirstChild(item.props.accessibility),
          onKeyDown: e => {
            if (e.key !== 'ArrowRight') return;
            makeFirstChildVisible(e, item.props);
          },
        });
      })}
      {children}
      {stickyBottomItemsIndex.map((itemIndex: number, index: number, arr: number[]) => {
        const item = renderedItems[itemIndex];
        return React.cloneElement(item as React.ReactElement, {
          style: getStickyStyle(index, false, arr.length),
          ...treeItemBehaviorHandler,
        });
      })}
    </div>
  );
};

const calcRenderedHeight = (renderedItems: React.ReactElement[], stickyItemSize: number, itemSize: number) =>
  renderedItems.reduce<number>(
    (renderedHeight, item) => renderedHeight + (item.props.level === 1 ? stickyItemSize : itemSize),
    0,
  );

interface ReRenderStickyTreeProps {
  renderedItems: React.ReactElement<TreeItemProps>[];
  stickyItemSize: number;
  itemSize: number;
  height: number;
  toplvlItemsId: string[];
  passActiveItemsIdChange: (idsToRemove?: string[], idsToAdd?: string[]) => void;
}

const ReRenderStickyTree = ({
  renderedItems,
  stickyItemSize,
  itemSize,
  height,
  toplvlItemsId,
  passActiveItemsIdChange,
}: ReRenderStickyTreeProps) => {
  const ref = React.useRef(null); // ref for entire list

  const [stickyTopIds, setStickyTopIds] = React.useState<string[]>([toplvlItemsId[0]]);
  const [stickyBottomIds, setStickyBottomIds] = React.useState<string[]>(toplvlItemsId.slice(1));

  // when navigate with keyboard, use `itemIdTobeFocused` to remember the focused item id,
  // then when DOM updates are finished, sticky tree knows which item to focus on
  const [itemIdTobeFocused, setItemIdTobeFocused] = React.useState<string>(null);
  const passItemIdTobeFocused = React.useCallback(newFocusId => setItemIdTobeFocused(newFocusId), []);

  // retain focus after items gotten clicked and triggers DOM updates
  React.useLayoutEffect(() => {
    // useLayoutEffect because we need to scroll, which mutates the DOM within the virtualized window.
    // scrollToItem calls `setState` on List component created by react-window.
    // useLayoutEffect will cause an immediate re-render on react-window after `setState` in `scrollToItem` is called.
    // while useEffect won't.
    if (!itemIdTobeFocused) return;

    const toFocusIndex = renderedItems.findIndex(item => item.props.id === itemIdTobeFocused);
    if (toFocusIndex < 0) return;
    const toFocus = (renderedItems[toFocusIndex].props.contentRef as any)?.current;

    if (!toFocus) {
      ref.current.scrollToItem(toFocusIndex, 'center'); // scroll to item
    }
  });

  // returns true when an item is not sticky header
  const isNonSticky = React.useCallback(
    (item: React.ReactElement<TreeItemProps>) =>
      stickyTopIds.indexOf(item.props.id) === -1 && stickyBottomIds.indexOf(item.props.id) === -1,
    [stickyTopIds, stickyBottomIds],
  );

  const onClick = React.useCallback(
    (_event: React.MouseEvent<HTMLElement>, itemProps: TreeItemProps) => {
      // when a sticky header (itemProps.level === 1) is clicked, there'll be re-render afterwards to pull up its right siblings.
      // Therefore call passItemIdTobeFocused to retain focus
      if (itemProps.level === 1) setItemIdTobeFocused(itemProps.id);
      else setItemIdTobeFocused(null);

      if (!itemProps.items || !itemProps.items.length) return; // item is not expandable, click will do nothing

      if (itemProps.expanded) {
        // item is expanded. therefore collapse it
        passActiveItemsIdChange([itemProps.id]);
      } else {
        // item is collapsed. therefore expand it

        // find the sticky parent of this item
        // IMPORTANT: this is why sticky tree supports only 2/3 levels
        let toplvlParentId = itemProps.parent;
        // here's the logic for finding sticky parent, if we want to support more levels:
        // let parentItem = item;
        // while (parentItem?.props?.parent) {
        //   parentItem = renderedItems.find(
        //     (item: React.ReactElement<TreeItemProps>) =>
        //       item.props.id === parentItem.props.parent
        //   );
        // }
        // const toplvlParentId = parentItem.props.id;

        if (toplvlParentId == null) {
          // item is sticky parent, therefore find its left sibling that is sticking to top
          toplvlParentId = toplvlItemsId[toplvlItemsId.findIndex(id => id === itemProps.id) - 1];
        }

        // stick all its sticky parent's right siblings to bottom
        const newStickyBottomIds = toplvlItemsId.slice(toplvlItemsId.findIndex(id => id === toplvlParentId) + 1);
        setStickyBottomIds(newStickyBottomIds);

        passActiveItemsIdChange(newStickyBottomIds, itemProps.level === 1 ? [] : [itemProps.id]);
      }
    },
    [toplvlItemsId, passActiveItemsIdChange, setStickyBottomIds, setItemIdTobeFocused],
  );

  const onClickSticky = React.useCallback(
    (_event: React.MouseEvent<HTMLElement>, itemProps: TreeItemProps) => {
      setItemIdTobeFocused(itemProps.id); // retain focus after re-render

      let toFocusItemIndex;
      if (itemProps.expanded) {
        // it is already the main item stick to top, collapse it and stick its right sibling, if any, on top
        toFocusItemIndex = toplvlItemsId.findIndex(id => id === itemProps.id) + 1;
      } else {
        // expand it and stick it to top
        toFocusItemIndex = toplvlItemsId.findIndex(id => id === itemProps.id);
      }

      const newStickyTopIds = toplvlItemsId.slice(0, toFocusItemIndex + 1);
      const newStickyBottomIds = toplvlItemsId.slice(toFocusItemIndex + 1);

      ref.current.scrollTo(0);

      passActiveItemsIdChange(
        [...newStickyTopIds, ...newStickyBottomIds],
        toFocusItemIndex < toplvlItemsId.length ? [toplvlItemsId[toFocusItemIndex]] : [],
      );
      setStickyTopIds(newStickyTopIds);
      setStickyBottomIds(newStickyBottomIds);
    },
    [ref, toplvlItemsId, passActiveItemsIdChange, setStickyTopIds, setStickyBottomIds, setItemIdTobeFocused],
  );

  // When using keyboard, and navigate to non-sticky items, they could be hidden behind sticky headers.
  // Scroll to make the focused non-sticky items always visible
  const makeVisibleOnFocus = React.useCallback(
    (e: React.FocusEvent<HTMLElement>, treeItemProps: TreeItemProps) => {
      if (treeItemProps.level === 1) return; // focused sticky items are always visible, so no need to deal with them

      let itemRef = e.target;
      if (itemRef.className.includes(treeTitleClassName)) itemRef = itemRef.parentElement; // when treeTitle focused, get its outer treeItem

      const scrolled = ref.current.state.scrollOffset;

      const hiddenHeightBottom =
        itemRef.offsetTop + itemRef.offsetHeight - scrolled - (height - stickyBottomIds.length * stickyItemSize);
      const hiddenHeightTop = itemRef.offsetTop - scrolled - stickyTopIds.length * stickyItemSize;

      if (hiddenHeightBottom > 0) {
        // item is hidden behind sticky headers on the bottom
        ref.current.scrollTo(scrolled + hiddenHeightBottom);
      } else if (hiddenHeightTop < 0) {
        // hidden behind sticky headers on the top
        ref.current.scrollTo(scrolled + hiddenHeightTop);
      }
    },
    [ref, height, stickyTopIds, stickyBottomIds, stickyItemSize],
  );

  // when using keyboard, and navigate to a parent/child item using left/right arrow,
  // scroll to make sure they are rendered and visible
  const handleArrowKeyNavigation = React.useCallback(
    (idTobeFocused: string) => {
      if (!idTobeFocused) return;

      const itemIndex = renderedItems.findIndex(item => item.props.id === idTobeFocused);
      const item = renderedItems[itemIndex];
      if ((item?.props.contentRef as any)?.current) {
        // item is already visible, just focus on it
        if (!item.props.items) {
          // leaf node. focus on treeTitle
          (item.props.contentRef as any).current.firstChild.focus();
        } else (item.props.contentRef as any).current.focus();
      } else {
        // item is not rendered
        ref.current.scrollToItem(itemIndex, 'center'); // scroll to item
        setItemIdTobeFocused(idTobeFocused);
      }
    },
    [renderedItems, setItemIdTobeFocused, ref],
  );

  const makeParentVisible = React.useCallback(
    (_event: React.SyntheticEvent<HTMLElement>, treeItemProps: TreeItemProps) => {
      const parentId = treeItemProps.parent;
      handleArrowKeyNavigation(parentId);
    },
    [handleArrowKeyNavigation],
  );

  const makeFirstChildVisible = React.useCallback(
    (_event: React.SyntheticEvent<HTMLElement>, treeItemProps: TreeItemProps) => {
      const firstChildId = (treeItemProps.items?.[0] as any)?.id;
      handleArrowKeyNavigation(firstChildId);
    },
    [handleArrowKeyNavigation],
  );

  const retainFocusOnSiblingsExpand = React.useCallback(
    (_event: React.SyntheticEvent<HTMLElement>, treeItemProps: TreeItemProps) => {
      if (treeItemProps.level === 1) return; // don't care about onsibling Expand for sticky headers

      const parentId = treeItemProps.parent;
      const parentItem = renderedItems.find(item => item.props.id === parentId);
      if (!parentItem || parentItem.props.level !== 1) return; // this action works only on level 2 tree nodes

      const siblingsIds = parentItem.props.items.map(item => (item as any)?.id).filter(id => id !== treeItemProps.id);

      // stick all its sticky parent's right siblings to bottom
      const newStickyBottomIds = toplvlItemsId.slice(toplvlItemsId.findIndex(id => id === parentId) + 1);
      setStickyBottomIds(newStickyBottomIds);
      passActiveItemsIdChange(newStickyBottomIds, siblingsIds);

      // retain focus
      setItemIdTobeFocused(treeItemProps.id);
    },
    [renderedItems, passActiveItemsIdChange, setItemIdTobeFocused, setStickyBottomIds, toplvlItemsId],
  );

  // data for each item rendered by react-window
  const [itemData, setItemData] = React.useState<ItemDataType>({
    renderedItems,
    isNonSticky,
    onClick,
    makeVisibleOnFocus,
    makeParentVisible,
    makeFirstChildVisible,
    retainFocusOnSiblingsExpand,
  });
  React.useEffect(() => {
    setItemData({
      renderedItems,
      isNonSticky,
      onClick,
      makeVisibleOnFocus,
      makeParentVisible,
      makeFirstChildVisible,
      retainFocusOnSiblingsExpand,
    });
  }, [
    renderedItems,
    isNonSticky,
    onClick,
    makeVisibleOnFocus,
    makeParentVisible,
    makeFirstChildVisible,
    retainFocusOnSiblingsExpand,
  ]);

  const [innerElementContextValue, setInnerElementContextValue] = React.useState<InnerElementContextType>({
    height,
    stickyItemSize,
    stickyTopIds,
    stickyBottomIds,
    onClickSticky,
    itemIdTobeFocused,
    passItemIdTobeFocused,
  });
  React.useEffect(() => {
    setInnerElementContextValue({
      height,
      stickyItemSize,
      stickyTopIds,
      stickyBottomIds,
      onClickSticky,
      itemIdTobeFocused,
      passItemIdTobeFocused,
    });
  }, [height, stickyItemSize, stickyTopIds, stickyBottomIds, onClickSticky, itemIdTobeFocused, passItemIdTobeFocused]);

  const renderedHeight = calcRenderedHeight(renderedItems, stickyItemSize, itemSize);
  React.useLayoutEffect(() => {
    // prevent react window reuse item size based on index
    ref.current.resetAfterIndex(0);

    if (stickyBottomIds.length && renderedHeight < height) {
      // there's extra space in the container, pull up the next sticky header and expand it
      const toExpand = stickyBottomIds.shift();
      passActiveItemsIdChange([], [toExpand]);
      setStickyBottomIds(stickyBottomIds);
    }
  }, [renderedHeight, height, stickyBottomIds, passActiveItemsIdChange, setStickyBottomIds]);

  const getItemSize = React.useCallback(
    (index: number) => (renderedItems[index]?.props?.level === 1 ? stickyItemSize : itemSize),
    [renderedItems, stickyItemSize, itemSize],
  );
  const getItemKey = React.useCallback(
    (index: number, data: ItemDataType) => data.renderedItems[index]?.props?.id ?? index,
    [],
  );

  return (
    <InnerElementContext.Provider value={innerElementContextValue}>
      <List
        ref={ref}
        {...{
          innerElementType: InnerElementType,
          itemSize: getItemSize,
          itemKey: getItemKey,
          itemData,
          height,
          itemCount: renderedItems.length,
          style: {
            overflowX: 'hidden',
          },
        }}
      >
        {ItemWrapper}
      </List>
    </InnerElementContext.Provider>
  );
};

export interface StickyTreeProps {
  stickyItemSize: number;
  itemSize: number;
  height: number;
  width: number;
  items: ObjectShorthandCollection<TreeItemProps>;
  displayChildrenNum?: boolean;

  /** Accessibility behavior for tree */
  accessibility?: Accessibility<TreeBehaviorProps>;
  'aria-label'?: AccessibilityAttributes['aria-label'];
}

const VirtualizedStickyTree = (props: StickyTreeProps) => {
  const { stickyItemSize, itemSize, height, width, items } = props;

  const toplvlItemsId = items.map(item => item.id);

  const [activeItemIds, setActiveItemIds] = React.useState<string[]>([items[0].id]);

  const passActiveItemsIdChange = React.useCallback((idsToRemove: string[] = [], idsToAdd: string[] = []) => {
    setActiveItemIds(currActiveItemIds =>
      currActiveItemIds.filter(id => idsToRemove.findIndex(idToRemove => id === idToRemove) < 0).concat(idsToAdd),
    );
  }, []);

  const renderItems = React.useCallback(
    (renderedItems: React.ReactElement<TreeItemProps>[]) => (
      <ReRenderStickyTree
        renderedItems={renderedItems}
        {...{
          stickyItemSize,
          itemSize,
          height,
          width,
          toplvlItemsId,
          passActiveItemsIdChange,
        }}
      />
    ),
    [stickyItemSize, itemSize, height, width, toplvlItemsId, passActiveItemsIdChange],
  );

  return (
    <Tree
      accessibility={props.accessibility}
      aria-label={props['aria-label']}
      items={items}
      activeItemIds={activeItemIds}
      renderItemTitle={StickyTreeTitle}
      style={{
        padding: 0,
        width,
      }}
      renderedItems={renderItems}
    />
  );
};

export default VirtualizedStickyTree;
