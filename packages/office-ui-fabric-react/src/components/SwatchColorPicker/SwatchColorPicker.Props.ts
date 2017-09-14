export interface ISwatchColorPicker { }

export interface ISwatchColorPickerProps {
  /**
   * Gets the component ref.
   */
  componentRef?: (componentRef?: ISwatchColorPicker) => void;

  /**
   * the number of columns for the swatch color picker
   */
  columnCount: number;

  /**
   * The id for the swatch color picker
   */
  id?: string;

  /**
   * Additional class name to provide on the root element
   */
  className?: string;

  /**
   * The shape of the color cells, defaults to circle
   */
  cellShape?: 'circle' | 'square';

  /**
   * The id of color cell that is currently selected
   */
  selectedId?: string;

  /**
   * The color cells that will be made available to the user
   */
  colorCells: IColorCellProps[];

  /**
   * Callback issued when the user changes the color.
   * Note, if no id or color is given, there is no selected cell
   * (e.g. the user executed the currently selected cell to unselect it)
   */
  onColorChanged?: (id?: string, color?: string) => void;

  /**
   * Callback issued when the user hovers over a color cell.
   * Note, if no id or color is given, cells are not longer being hovered
   */
  onCellHovered?: (id?: string, color?: string) => void;

  /**
   * Callback issued when the user focuses a color cell.
   * Note, if no id or color is given, cells are not longer being focused
   */
  onCellFocused?: (id?: string, color?: string) => void;

  /**
   * Is this swatch color picker disabled?
   */
  disabled?: boolean;

  /**
   * The optional position this grid is in the parent set (index in a parent menu, for example)
   */
  positionInSet?: number;

  /**
   * The optional size of the parent set (size of parent menu, for example)
   */
  setSize?: number;

  /**
   * Should focus cycle to the beginning of once the user navigates past the end (and visa vsersa). Defaults to true
   */
  shouldFocusCircularNavigate?: boolean;
}

export interface IColorCellProps {

  /**
   * Arbitrary unique string associated with this option
   */
  id: string;

  /**
   * The label for this item.
   * Visible text if this item is a header,
   * tooltip if is this item is normal
   */
  label?: string;

  /**
   * The CSS-compatible string to describe the color
   */
  color?: string;

  /**
   * Index for this option
   */
  index?: number;

}