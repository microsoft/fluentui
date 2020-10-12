import * as React from 'react';
import { VariableSizeList as List } from 'react-window';
import {
  ComponentEventHandler,
  ObjectShorthandCollection,
  Tree,
  TreeItemProps,
  treeTitleClassName,
} from '@fluentui/react-northstar';
import StickyTreeTitle from './StickyTreeTitle';
import { InnerElementContext, InnerElementContextType } from './context';

class ItemWrapper extends React.PureComponent<{
  index: number;
  isScrolling?: boolean;
  style: Object;
  data: any;
}> {
  render() {
    const { index, style, data } = this.props;
    const item = data.renderedItems[index];
    if (item) {
      return data.isNonSticky(item)
        ? React.cloneElement(item, {
            style,
            onTitleClick: data.onClick,
            onFocusParent: data.handleFocusParent,
            onFocusFirstChild: data.handleFocusFirstChild,
            onSiblingsExpand: (event: React.SyntheticEvent<HTMLElement>, treeItemProps: TreeItemProps) => {
              if (treeItemProps.level !== 1)
                // don't care about onsibling Expand for sticky headers
                data.handleOnSiblingsExpand(event, treeItemProps);
            },
            onFocus: (e: React.FocusEvent<HTMLElement>) => {
              if (item.props.level === 1) return;
              data.handleOnFocus(e);
            },
          })
        : null;
    }

    return null;
  }
}

const InnerElementType = ({ children, style }) => {
  const context = React.useContext(InnerElementContext);
  const { height, stickyItemSize, stickyTopIds, stickyBottomIds, onClickSticky } = context;

  if (!children?.length) return null;

  const data = children[0].props?.data;
  const { renderedItems } = data;

  const stickyTopItemsIndex = stickyTopIds.map((id: string) =>
    renderedItems.findIndex((item: React.ReactElement<TreeItemProps>) => item.props.id === id),
  );
  const stickyBottomItemsIndex = stickyBottomIds.map((id: string) =>
    renderedItems.findIndex((item: React.ReactElement<TreeItemProps>) => item.props.id === id),
  );

  return (
    <div
      style={{
        ...style,
        height: Math.max(height, style.height),
      }}
    >
      {stickyTopItemsIndex.map((index: number) => {
        const item = renderedItems[index];
        return React.cloneElement(item, {
          style: {
            position: 'sticky',
            height: stickyItemSize,
            zIndex: 2,
            top: index * stickyItemSize,
          },
          onTitleClick: onClickSticky,
          onFocusParent: data.handleFocusParent,
          onFocusFirstChild: data.handleFocusFirstChild,
        });
      })}
      {children}
      {stickyBottomItemsIndex.map((itemIndex: number, index: number, arr: number[]) => {
        const item = renderedItems[itemIndex];
        return React.cloneElement(item, {
          style: {
            position: 'sticky',
            height: stickyItemSize,
            zIndex: 111,
            // stick items to the container bottom, with the smaller-indexed items stacked on bigger-indexed items
            top: height - (arr.length - index) * stickyItemSize,
          },
          onTitleClick: onClickSticky,
          onFocusParent: data.handleFocusParent,
          onFocusFirstChild: data.handleFocusFirstChild,
        });
      })}
    </div>
  );
};

const calcRenderedHeight = (renderedItems: React.ReactElement[], stickyItemSize: number, itemSize: number) => {
  let renderedHeight = 0;
  renderedItems.forEach(item => {
    renderedHeight = renderedHeight + (item.props.level === 1 ? stickyItemSize : itemSize);
  });
  return renderedHeight;
};

interface ReRenderStickyTreeProps {
  renderedItems: React.ReactElement<TreeItemProps>[];
  stickyItemSize: number;
  itemSize: number;
  height: number;
  toplvlItemsId: string[];
  onActiveItemsIdChange: (idsToRemove?: string[], idsToAdd?: string[]) => void;
}

interface ItemDataType {
  renderedItems: React.ReactElement<TreeItemProps>[];
  isNonSticky: (item: React.ReactElement<TreeItemProps>) => boolean;
  onClick: (event: React.MouseEvent<HTMLElement>, itemProps: TreeItemProps) => void;
  handleOnFocus: (event: React.FocusEvent<HTMLElement>) => void;
  handleFocusParent: ComponentEventHandler<TreeItemProps>;
  handleFocusFirstChild: ComponentEventHandler<TreeItemProps>;
  handleOnSiblingsExpand: ComponentEventHandler<TreeItemProps>;
}

const ReRenderStickyTree = ({
  renderedItems,
  stickyItemSize,
  itemSize,
  height,
  toplvlItemsId,
  onActiveItemsIdChange,
}: ReRenderStickyTreeProps) => {
  const [stickyTopIds, setStickyTopIds] = React.useState<string[]>([toplvlItemsId[0]]);
  const [stickyBottomIds, setStickyBottomIds] = React.useState<string[]>(toplvlItemsId.slice(1));

  const passOnStickyTopIds = React.useCallback((newStickyTopIds: string[]) => {
    setStickyTopIds([...newStickyTopIds]);
  }, []);
  const passOnStickyBottomIds = React.useCallback((newStickyBottomIds: string[]) => {
    setStickyBottomIds([...newStickyBottomIds]);
  }, []);

  // when navigate with keyboard, use `itemIdTobeFocused` to remember the focused item id,
  // then when DOM updates are finished, sticky tree knows which item to focus on
  const [itemIdTobeFocused, setItemIdTobeFocused] = React.useState<string>(null);
  const passItemIdTobeFocused = React.useCallback((newItemIdTobeFocused: string) => {
    setItemIdTobeFocused(newItemIdTobeFocused);
  }, []);

  React.useEffect(() => {
    // retain focus after sticky items gotten clicked and triggers DOM updates
    if (itemIdTobeFocused === null) return;

    const toFocusIndex = renderedItems.findIndex(item => item.props.id === itemIdTobeFocused);
    const toFocusItem = renderedItems[toFocusIndex];
    const toFocus = (toFocusItem?.props.contentRef as any)?.current;
    if (toFocus) {
      if (toFocusItem.props.level !== 1) ref.current.scrollToItem(toFocusIndex, 'center');
      toFocus.focus();
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
      if (itemProps.level === 1) passItemIdTobeFocused(itemProps.id);
      else passItemIdTobeFocused(null);

      if (!itemProps.items || !itemProps.items.length) return; // item is not expandable, click will do nothing

      if (itemProps.level === 1) {
        // item is sticky parent, but not sticked
        const toFocusItemIndex = toplvlItemsId.findIndex((id: string) => id === itemProps.id);

        const newStickyTopIds = toplvlItemsId.slice(0, toFocusItemIndex + 1); // every left siblings till itself
        const newStickyBottomIds = toplvlItemsId.slice(toFocusItemIndex + 1); // every right siblings

        onActiveItemsIdChange([...newStickyTopIds, ...newStickyBottomIds], [itemProps.id]);
        passOnStickyTopIds(newStickyTopIds);
        passOnStickyBottomIds(newStickyBottomIds);
      } else if (itemProps.expanded) {
        // item is not sticky parent, and expanded. therefore collapse it
        onActiveItemsIdChange([itemProps.id]);
      } else {
        // item is not sticky parent, and collapsed. therefore expand it

        // find the sticky parent of this item
        // IMPORTANT: this is why sticky tree supports only 2/3 levels
        const toplvlParentId = itemProps.parent;
        // here's the logic for finding sticky parent, if we want to support more levels:
        // let parentItem = item;
        // while (parentItem?.props?.parent) {
        //   parentItem = renderedItems.find(
        //     (item: React.ReactElement<TreeItemProps>) =>
        //       item.props.id === parentItem.props.parent
        //   );
        // }
        // const toplvlParentId = parentItem.props.id;

        // stick all its sticky parent's right siblings to bottom
        const newStickyBottomIds = toplvlItemsId.slice(toplvlItemsId.findIndex(id => id === toplvlParentId) + 1);
        passOnStickyBottomIds(newStickyBottomIds);

        onActiveItemsIdChange(newStickyBottomIds, [itemProps.id]);
      }
    },
    [toplvlItemsId, onActiveItemsIdChange, passOnStickyTopIds, passOnStickyBottomIds, passItemIdTobeFocused],
  );

  const onClickSticky = React.useCallback(
    (_event: React.MouseEvent<HTMLElement>, itemProps: TreeItemProps) => {
      passItemIdTobeFocused(itemProps.id); // retain focus after re-render

      if (itemProps.expanded) return; // it is already the main item stick to top, do nothing

      // expand it and stick it to the last one on top
      const toFocusItemIndex = toplvlItemsId.findIndex(id => id === itemProps.id);

      const newStickyTopIds = toplvlItemsId.slice(0, toFocusItemIndex + 1); // every left siblings till itself
      const newStickyBottomIds = toplvlItemsId.slice(toFocusItemIndex + 1); // every right siblings

      onActiveItemsIdChange([...newStickyTopIds, ...newStickyBottomIds], [itemProps.id]);
      passOnStickyTopIds(newStickyTopIds);
      passOnStickyBottomIds(newStickyBottomIds);
    },
    [toplvlItemsId, onActiveItemsIdChange, passOnStickyTopIds, passOnStickyBottomIds, passItemIdTobeFocused],
  );

  const ref = React.useRef(null); // ref for entire list

  // When using keyboard, and navigate to non-sticky items, they could be hidden behind sticky headers.
  // Scroll to make the focused non-sticky items always visible
  const handleOnFocus = React.useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      let itemRef = e.target as any;
      if (itemRef.className.includes(treeTitleClassName)) itemRef = itemRef.parentNode; // when treeTitle focused, get its outer treeItem

      if (itemRef.style.position !== 'sticky') {
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
      }
    },
    [ref, height, stickyTopIds, stickyBottomIds, stickyItemSize],
  );

  // when using keyboard, and navigate to a parent/child item using left/right arrow,
  // scroll to make sure they are visible
  const handleArrowKeyNavigation = React.useCallback(
    (idTobeFocused: string) => {
      if (!idTobeFocused) return;

      const itemIndex = renderedItems.findIndex(item => item.props.id === idTobeFocused);
      const item = renderedItems[itemIndex];
      if ((item.props.contentRef as any)?.current) {
        // item is already visible, just focus on it
        (item.props.contentRef as any).current.focus();
      } else {
        // item is not rendered
        ref.current.scrollToItem(itemIndex, 'center');
        passItemIdTobeFocused(idTobeFocused);
      }
    },
    [renderedItems, passItemIdTobeFocused, ref],
  );

  const handleFocusParent = React.useCallback(
    (event: React.SyntheticEvent<HTMLElement>, treeItemProps: TreeItemProps) => {
      const parentId = treeItemProps.parent;
      handleArrowKeyNavigation(parentId);
    },
    [handleArrowKeyNavigation],
  );

  const handleFocusFirstChild = React.useCallback(
    (event: React.SyntheticEvent<HTMLElement>, treeItemProps: TreeItemProps) => {
      const firstChildId = (treeItemProps.items?.[0] as TreeItemProps).id;
      handleArrowKeyNavigation(firstChildId);
    },
    [handleArrowKeyNavigation],
  );

  const handleOnSiblingsExpand = React.useCallback(
    (event: React.SyntheticEvent<HTMLElement>, treeItemProps: TreeItemProps) => {
      const parentId = treeItemProps.parent;
      const parentItem = renderedItems.find(item => item.props.id === parentId);
      if (!parentItem || parentItem.props.level !== 1) return; // this action works only on level 2 tree nodes

      const siblingsId = parentItem.props.items
        .map((item: TreeItemProps) => item.id)
        .filter(id => id !== treeItemProps.id);

      // stick all its sticky parent's right siblings to bottom
      const newStickyBottomIds = toplvlItemsId.slice(toplvlItemsId.findIndex(id => id === parentId) + 1);
      passOnStickyBottomIds(newStickyBottomIds);
      onActiveItemsIdChange(newStickyBottomIds, siblingsId);

      // retain focus
      passItemIdTobeFocused(treeItemProps.id);
    },
    [renderedItems, onActiveItemsIdChange, passItemIdTobeFocused, passOnStickyBottomIds, toplvlItemsId],
  );

  // data for each item rendered by react-window
  const [itemData, setItemData] = React.useState<ItemDataType>({
    renderedItems,
    isNonSticky,
    onClick,
    handleOnFocus,
    handleFocusParent,
    handleFocusFirstChild,
    handleOnSiblingsExpand,
  });
  React.useEffect(() => {
    setItemData({
      renderedItems,
      isNonSticky,
      onClick,
      handleOnFocus,
      handleFocusParent,
      handleFocusFirstChild,
      handleOnSiblingsExpand,
    });
  }, [
    renderedItems,
    isNonSticky,
    onClick,
    handleOnFocus,
    handleFocusParent,
    handleFocusFirstChild,
    handleOnSiblingsExpand,
  ]);

  const [innerElementContextValue, setInnerElementContextValue] = React.useState<InnerElementContextType>({
    height,
    stickyItemSize,
    stickyTopIds,
    stickyBottomIds,
    onClickSticky,
  });
  React.useEffect(() => {
    setInnerElementContextValue({
      height,
      stickyItemSize,
      stickyTopIds,
      stickyBottomIds,
      onClickSticky,
    });
  }, [height, stickyItemSize, stickyTopIds, stickyBottomIds, onClickSticky]);

  const renderedHeight = calcRenderedHeight(renderedItems, stickyItemSize, itemSize);
  React.useLayoutEffect(() => {
    // prevent react window reuse item size based on index
    ref.current.resetAfterIndex(0);

    if (stickyBottomIds.length && renderedHeight < height) {
      // there's extra space in the container, pull up the next sticky header and expand it
      const toExpand = stickyBottomIds.shift();
      onActiveItemsIdChange([], [toExpand]);
      passOnStickyBottomIds(stickyBottomIds);
    }
  }, [renderedHeight, height, stickyBottomIds, onActiveItemsIdChange, passOnStickyBottomIds]);

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
}

const VirtualizedStickyTree = (props: StickyTreeProps) => {
  const { stickyItemSize, itemSize, height, width, items } = props;

  const toplvlItemsId = items.map(item => item.id);

  const [activeItemIds, setActiveItemIds] = React.useState<string[]>([items[0].id]);

  const onActiveItemsIdChange = React.useCallback((idsToRemove: string[] = [], idsToAdd: string[] = []) => {
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
          onActiveItemsIdChange,
        }}
      />
    ),
    [stickyItemSize, itemSize, height, width, toplvlItemsId, onActiveItemsIdChange],
  );

  return (
    <Tree
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
