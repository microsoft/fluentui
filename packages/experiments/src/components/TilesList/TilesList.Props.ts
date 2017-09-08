
import * as React from 'react';
import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { TilesList } from './TilesList';

export interface ITilesGridItem<TItem> {
  /**
   * A unique key to assign to the item within the grid.
   * This is only used for reconciliation, not selection behavior.
   */
  key: string;
  /**
   * The content item to be rendered. This will be passed back to `onRender`.
   */
  content: TItem;
  /**
   * The desired dimensions of the item, used to compute aspect ratio.
   * If not provided, this is assumed to be a square equivalent to the current row height.
   */
  desiredSize?: { width: number; height: number; };
  /**
   * Invoked to render the virtual DOM for the item.
   * This content will be rendered inside the cell allocated for the item.
   */
  onRender: (content: TItem, finalSize?: ITileSize) => (React.ReactNode | React.ReactNode[]);
}

export const enum TilesGridMode {
  /**
   * Every item in the grid gets its own row.
   */
  none,
  /**
   * Items in the row are stacked without resizing until they overflow.
   */
  stack,
  /**
   * Items in the row are stretched if necessary to fill the row.
   */
  fill
}

export interface ITilesGridSegment<TItem> {
  /**
   * A unique key to assign to the grid segment.
   * This will only be used for reconciliation.
   */
  key: string;
  /**
   * The items to render as part of a contiguous, flowing grid.
   * All items will be rendered with the same base row height and margin.
   */
  items: ITilesGridItem<TItem>[];
  /**
   * The spacing to allocate between items.
   */
  spacing?: number;
  /**
   * The base height for each row.
   */
  minRowHeight: number;
  /**
   * The maximum scale factor to use when stretching items to fill a row.
   */
  maxScaleFactor?: number;
  /**
   * The mode for the grid.
   */
  mode: TilesGridMode;
  /**
   * The top margin for the grid.
   */
  marginTop?: number;
  /**
   * The bottom margin for the grid.
   */
  marginBottom?: number;
}

export interface ITileSize {
  width: number;
  height: number;
}

export interface ITilesListProps<TItem> extends IBaseProps, React.HTMLAttributes<TilesList<TItem>> {
  /**
   * An array of items to assign to the list.
   * This should be complete and not contain any holes.
   * The items may either be header row specifications, or grid specifications which each
   * define their own items.
   */
  items: (ITilesGridItem<TItem> | ITilesGridSegment<TItem>)[];
  /**
   * The desired number of content cells to render per page.
   */
  cellsPerPage?: number;
}
