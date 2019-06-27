import * as React from 'react';
import { IViewportState, ScrollDirection, Axis } from '../Viewport/Viewport';

export interface IFixedListProps {
  /**
   * The total number of items contained in the list.
   */
  itemCount: number;

  /**
   * The fixed height of each item in the list.
   */
  itemHeight: number;

  /**
   * The current viewport state.
   */
  viewportState: IViewportState;

  /**
   * The height of the viewport this list is mounted in.
   */
  viewportHeight: number;

  /**
   * The width of the viewport this list is mounted in.
   */
  viewportWidth: number;

  /**
   * The height of the viewport this list is mounted in.
   */
  surfaceTop: number;

  /**
   * The height of item overscan before and after the visible area of the viewport.
   */
  overscanHeight: number;

  /**
   * Callback used to render an item with the given index.
   */
  onRenderItem: (itemIndex: number, style: React.CSSProperties) => JSX.Element | null;

  /**
   * Callback used to add and modify the list's calculated materialized range, for example in order to always render
   * a focused item, no matter whether it is currently in view or not.
   */
  onGetMaterializedRanges?: GetMaterializedRangesCallback;
}

export interface IItemRange {
  startIndex: number;
  endIndex: number;
}

export type GetMaterializedRangesCallback = (defaultMaterializedRanges: IItemRange[]) => IItemRange[];

const TRAILING_OVERSCAN_COUNT_WHILE_SCROLLING = 1;

/**
 * Calculates the currently visible range of items based on the viewport state.
 * @param props The FixedList props
 * @return
 */
function getVisibleItemRange(props: IFixedListProps): IItemRange {
  const { surfaceTop, itemHeight, viewportState, viewportHeight, itemCount } = props;

  const scrollTop = viewportState.scrollDistance[Axis.Y] - surfaceTop;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight));
  const endIndex = Math.min(itemCount - 1, Math.ceil((scrollTop + viewportHeight) / itemHeight));

  return { startIndex, endIndex };
}

/**
 * Calculates the materialized range of items based on the visible range. Consumers of FixedList can provide
 * a callback to add and modify the calculated materialized range, for example in order to always render
 * a focused item, no matter whether it is currently in view or not.
 * @param props The FixedList props
 */
function getMaterializedItemRanges(props: IFixedListProps): IItemRange[] {
  const { viewportState, overscanHeight, onGetMaterializedRanges, itemHeight, itemCount } = props;

  const { isScrolling, scrollDirection } = viewportState;

  const visibleRange = getVisibleItemRange(props);

  // Add overscan
  const overscanCount = Math.ceil(overscanHeight / itemHeight);

  visibleRange.startIndex = Math.max(
    0,
    visibleRange.startIndex -
      (!isScrolling || scrollDirection[Axis.Y] === ScrollDirection.backward ? overscanCount : TRAILING_OVERSCAN_COUNT_WHILE_SCROLLING)
  );
  visibleRange.endIndex = Math.min(
    itemCount - 1,
    visibleRange.endIndex +
      (!isScrolling || scrollDirection[Axis.Y] === ScrollDirection.forward ? overscanCount : TRAILING_OVERSCAN_COUNT_WHILE_SCROLLING)
  );

  let materializedRanges = [visibleRange];

  // Add custom materialized ranges (e.g. for currently focused item that is out of view)
  if (onGetMaterializedRanges) {
    materializedRanges = onGetMaterializedRanges(materializedRanges);
  }

  return materializedRanges;
}

/**
 * Calculates the number of materialized items given the array of materialized ranges.
 * Used to create an array of the correct size when rendering the materialized items.
 * @param props The FixedList props
 */
function getMaterializedItemsCount(materializedRanges: IItemRange[]): number {
  let materializedItemsCount = 0;

  for (const materializedRange of materializedRanges) {
    const { startIndex, endIndex } = materializedRange;

    materializedItemsCount += endIndex - startIndex + 1;
  }

  return materializedItemsCount;
}

/**
 * A simple virtualized List component which assumes that all its items have the same height.
 */
export const FixedList = React.memo((props: IFixedListProps) => {
  const { itemCount, itemHeight, onRenderItem } = props;

  const materializedRanges = getMaterializedItemRanges(props);
  const materializedItemsCount = getMaterializedItemsCount(materializedRanges);

  const children = new Array(materializedItemsCount);

  let childIndex = 0;
  for (const materializedRange of materializedRanges) {
    const { startIndex, endIndex } = materializedRange;

    for (let i = startIndex; i <= endIndex; i++) {
      children[childIndex] = onRenderItem(i, {
        position: 'absolute',
        width: '100%',
        height: `${itemHeight}px`,
        transform: `translate(0, ${i * itemHeight}px)`
      });

      childIndex++;
    }
  }

  const style: React.CSSProperties = {
    position: 'relative',
    height: `${itemCount * itemHeight}px`
  };

  return <div style={style}>{children}</div>; // tslint:disable-line:jsx-ban-props
});
