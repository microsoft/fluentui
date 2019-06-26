import * as React from 'react';
import { IViewportState, ScrollDirection, Coord } from '../Viewport/Viewport';

const TRAILING_OVERSCAN_COUNT_WHEN_SCROLLING = 1;

export interface IFixedListProps {
  itemCount: number;
  itemHeight: number;

  viewportState: IViewportState;
  viewportHeight: number;
  viewportWidth: number;

  surfaceTop: number;

  overscanHeight: number;

  getMaterializedRangesCallback?: GetMaterializedRangesCallback;

  onRenderItem: (itemIndex: number, style: React.CSSProperties) => JSX.Element | null;
}

export interface IRange {
  startIndex: number;
  endIndex: number;
}

export type GetMaterializedRangesCallback = (defaultMaterializedRanges: IRange[]) => IRange[];

function getVisibleRange(props: IFixedListProps): IRange {
  const { surfaceTop, itemHeight, viewportState, viewportHeight, itemCount } = props;

  const scrollTop = viewportState.scrollDistance[Coord.Y] - surfaceTop;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight));
  const endIndex = Math.min(itemCount - 1, Math.ceil((scrollTop + viewportHeight) / itemHeight));

  return { startIndex, endIndex };
}

function getMaterializedRanges(props: IFixedListProps): IRange[] {
  const { viewportState, overscanHeight, getMaterializedRangesCallback, itemHeight, itemCount } = props;

  const { isScrolling, scrollDirection } = viewportState;

  const visibleRange = getVisibleRange(props);

  // Add overscan
  visibleRange.startIndex = Math.max(
    0,
    visibleRange.startIndex -
      (!isScrolling || scrollDirection[Coord.Y] === ScrollDirection.backward
        ? Math.ceil(overscanHeight / itemHeight)
        : TRAILING_OVERSCAN_COUNT_WHEN_SCROLLING)
  );
  visibleRange.endIndex = Math.min(
    itemCount - 1,
    visibleRange.endIndex +
      (!isScrolling || scrollDirection[Coord.Y] === ScrollDirection.forward
        ? Math.ceil(overscanHeight / itemHeight)
        : TRAILING_OVERSCAN_COUNT_WHEN_SCROLLING)
  );

  let materializedRanges = [visibleRange];

  // Add custom materialized ranges (e.g. for currently focused item that is out of view)
  if (getMaterializedRangesCallback) {
    materializedRanges = getMaterializedRangesCallback(materializedRanges);
  }

  return materializedRanges;
}

function getMaterializedItemsCount(materializedRanges: IRange[]): number {
  let materializedItemsCount = 0;

  for (const materializedRange of materializedRanges) {
    const { startIndex, endIndex } = materializedRange;

    materializedItemsCount += endIndex - startIndex + 1;
  }

  return materializedItemsCount;
}

export const FixedList = React.memo((props: IFixedListProps) => {
  const { itemCount, itemHeight, onRenderItem } = props;

  const materializedRanges = getMaterializedRanges(props);
  const materializedItemsCount = getMaterializedItemsCount(materializedRanges);

  const style: React.CSSProperties = {
    position: 'relative',
    height: `${itemCount * itemHeight}px`
  };

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

  return <div style={style}>{children}</div>; // tslint:disable-line:jsx-ban-props
});
