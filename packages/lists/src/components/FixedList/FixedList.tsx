import * as React from 'react';
import { ScrollDirection, Axis } from '../Viewport/Viewport.types';
import { IFixedListProps, ItemRange, ItemRangeIndex } from './FixedList.types';

const MIN_OVERSCAN_COUNT = 1;
const TRAILING_OVERSCAN_COUNT_WHILE_SCROLLING = 1;

/**
 * Calculates the currently visible range of items based on the viewport state.
 * @param props The FixedList props
 * @return The currently visible range of items
 */
function getVisibleItemRange(props: IFixedListProps): ItemRange {
  const { surfaceTop, itemHeight, viewportState, viewportHeight, itemCount } = props;

  const scrollTop = viewportState.scrollDistance[Axis.Y] - surfaceTop;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight));
  const endIndex = Math.min(itemCount, Math.ceil((scrollTop + viewportHeight) / itemHeight) + 1);

  return [startIndex, endIndex];
}

/**
 * Calculates the materialized range of items based on the visible range. Consumers of FixedList can provide
 * a callback to add and modify the calculated materialized range, for example in order to always render
 * a focused item, no matter whether it is currently in view or not.
 * @param props The FixedList props
 * @return The currently visible range of items plus overscan
 */
function getMaterializedItemRanges(props: IFixedListProps): ItemRange[] {
  const { viewportState, overscanHeight, onModifyMaterializedRanges, itemHeight, itemCount } = props;

  const { isScrolling, scrollDirection } = viewportState;

  const itemRange = getVisibleItemRange(props);

  // Add item overscan. Inspired by react-window, we overscan in a given direction only when the user is not scrolling or
  // when the overscan direction equals the scroll direction.
  // https://github.com/bvaughn/react-window/blob/729f621fb0b127ecec8ce71e1d0952920006658c/src/createListComponent.js#L506
  const overscanCount = Math.min(Math.ceil(overscanHeight / itemHeight), MIN_OVERSCAN_COUNT);
  const overscanBehind =
    !isScrolling || scrollDirection[Axis.Y] === ScrollDirection.backward ? overscanCount : TRAILING_OVERSCAN_COUNT_WHILE_SCROLLING;
  const overscanAhead =
    !isScrolling || scrollDirection[Axis.Y] === ScrollDirection.forward ? overscanCount : TRAILING_OVERSCAN_COUNT_WHILE_SCROLLING;

  const [startIndex, endIndex] = itemRange;
  itemRange[ItemRangeIndex.startIndex] = Math.max(0, startIndex - overscanBehind);
  itemRange[ItemRangeIndex.endIndex] = Math.min(itemCount, endIndex + overscanAhead);

  // Construct final materialized ranges
  const materializedRanges = [itemRange];

  // Modify materialized ranges (e.g. for currently focused item that is out of view)
  if (onModifyMaterializedRanges) {
    onModifyMaterializedRanges(materializedRanges);
  }

  return materializedRanges;
}

/**
 * Calculates the number of materialized items given the array of materialized ranges.
 * Used to create an array of the correct size when rendering the materialized items.
 * @param props The FixedList props
 */
function getMaterializedItemsCount(materializedRanges: ItemRange[]): number {
  let materializedItemsCount = 0;

  for (const materializedRange of materializedRanges) {
    const [startIndex, endIndex] = materializedRange;

    materializedItemsCount += endIndex - startIndex;
  }

  return materializedItemsCount;
}

/**
 * A simple virtualized List component which assumes that all its items have the same height.
 */
export const FixedList = React.memo((props: IFixedListProps) => {
  const { itemCount, itemHeight, onRenderItem, viewportState } = props;
  const { isScrolling } = viewportState;

  const materializedRanges = getMaterializedItemRanges(props);
  const materializedItemsCount = getMaterializedItemsCount(materializedRanges);

  const children = new Array(materializedItemsCount);

  let childIndex = 0;
  for (const materializedRange of materializedRanges) {
    const [startIndex, endIndex] = materializedRange;

    for (let i = startIndex; i <= endIndex; i++) {
      children[childIndex] = onRenderItem(i, {
        position: 'absolute',
        width: '100%',
        height: `${itemHeight}px`,

        // Use a 'translate' transformation instead of positioning via 'top' in order to use GPU accelleration and to
        // enable smooth transitions if an element's position changes
        transform: `translate(0, ${i * itemHeight}px)`
      });

      childIndex++;
    }
  }

  const style: React.CSSProperties = {
    position: 'relative',
    height: `${itemCount * itemHeight}px`,

    // Similar to react-window, we disable pointer events while scrolling to improve perf
    pointerEvents: isScrolling ? 'none' : undefined
  };

  return <div style={style}>{children}</div>; // tslint:disable-line:jsx-ban-props
});
