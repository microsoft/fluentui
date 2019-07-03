import { IViewportState } from '../Viewport/Viewport.types';

/**
 * Type representing an item range, where the first element is the start index (inclusive)
 * and the second element is the end index (exclusive).
 */
export type ItemRange = [number, number];
export enum ItemRangeIndex {
  startIndex = 0,
  endIndex = 1
}

export type ModifyMaterializedRangesCallback = (materializedRanges: ItemRange[]) => void;

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
   * The distance of the top of the viewport surface to the top of the list surface.
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
   * Callback used to modify the list's calculated materialized range, for example in order to always render
   * a focused item, no matter whether it is currently in view or not.
   */
  onModifyMaterializedRanges?: ModifyMaterializedRangesCallback;
}
