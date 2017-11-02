export interface IGridProps {
  /**
   * Gets the component ref.
   */
  componentRef?: () => void;

  /**
   * The items to turn into a grid
   */
  items: any[];

  /**
   * The number of columns
   */
  columnCount: number;

  /**
   * Custom renderer for the individual items
   */
  onRenderItem: (item: any, index: number) => JSX.Element;

  /**
   * Boolean indicating if the focus should support circular navigation.
   * This prop is only relevant if doNotcontainWithinFocusZone is not true
   */
  shouldFocusCircularNavigate?: boolean;

  /**
   * If true do not contain the grid inside of a FocusZone.
   * If false contain the grid inside of a FocusZone.
   */
  doNotContainWithinFocusZone?: boolean;

  /**
   * Optional, class name for the FocusZone container for the grid
   */
  containerClassName?: string;

  /**
   * Optional, handler for when the grid should blur
   */
  onBlur?: () => void;

  /**
   * The optional position this grid is in the parent set (index in a parent menu, for example)
   */
  positionInSet?: number;

  /**
   * The optional size of the parent set (size of parent menu, for example)
   */
  setSize?: number;
}