export interface IColorPickerProps {
  /**
   * The CSS-compatible string to describe the initial color
   */
  color: string;

  /**
   * Callback issued when the user changes the color
   */
  onColorChanged?: (color: string) => void;
}
