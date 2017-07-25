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
   * The optional position this grid is in the parent set (index in a parent menu, for example)
   */
  positionInSet?: number;

  /**
   * The optional size of the parent set (size of parent menu, for example)
   */
  setSize?: number;
}