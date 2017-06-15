import { IIconProps } from '../../../Icon';
export enum CellShape {
  circle = 0,
  square = 1
}

export interface IPredefinedColorPickerProps {

  /**
   * the number of columns for the color picker
   */
  width: number;

  /**
   * The id for the color picker
   */
  id?: string;

  /**
   * The shape of the color cells, defaults to circle
   */
  cellShape?: CellShape;

  /**
   * The color cell that is currently selected
   */
  selectedKey?: string | number;

  /**
   * Icon props for the color picker. If given the color picker
   * will render inside of a menu
   */
  colorPickerButtonIconProps?: IIconProps;

  /**
   * Should the icon color be updated to align
   * wit the selected color? Default is false
   */
  updateButtonIconWithColor?: boolean;

  colorPickerItems: ColorPickerItemProps[];

  /**
   * Callback issued when the user changes the color
   */
  onColorChanged?: (color: string) => void;

  /**
   * Callback issued when the user hovers over a color cell
   */
  onCellHovered?: (color: string) => void;

  /**
 * Callback issued when the user focuses a color cell
 */
  onCellFocused?: (color: string) => void;
}

export interface ColorPickerItemProps {

  /**
   * Arbitrary string associated with this option
   */
  key?: string;

  /**
 * The label for this item.
 * Visible text uf this item is a header,
 * Tooltip if is this item is normal
 */
  label?: string;

  /**
   * The type of item this is
   */
  type?: ColorPickerItemType;

  /**
   * The CSS-compatible string to describe the color
   */
  color?: string;

  /**
   * Index for this option
   */
  index?: number;
}

export enum ColorPickerItemType {
  Normal = 0,
  Divider = 1,
  Header = 2
}