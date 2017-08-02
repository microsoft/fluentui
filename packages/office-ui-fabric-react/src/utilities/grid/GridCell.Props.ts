
export interface IGridCellProps {

  /**
   * The option that will be made available to the user
   */
  item: any;

  /**
   * Arbitrary unique string associated with this option
   */
  id: string;

  /**
   * Optional, if the this option should be diabled
   */
  disabled?: boolean;

  /**
   * Optional, the currently selectedIndex in the set of options
   */
  selectedIndex?: number;

  /**
   * The on click handler
   */
  onClick: (item: any) => void;

  /**
   * The render callback to handle rendering the item
   */
  onRenderItem: (item: any) => JSX.Element;

  /**
   * Optional, the onHover handler
   */
  onHover?: (item: any) => void;

  /**
   * Optional, the onFocus handler
   */
  onFocus?: (item: any) => void;

  /**
   * The accessible role for this option
   */
  role?: string;

  /**
   * Optional, className(s) to apply
   */
  className?: string;

  /**
  * Optional, the CSS class used for when the cell is disabled
  */
  cellDisabledStyle?: string[];

  /**
  * Optional, the CSS class used for when the cell is selected
  */
  cellIsSelectedStyle?: string[];
}
