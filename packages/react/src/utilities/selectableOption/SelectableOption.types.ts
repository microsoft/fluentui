export interface ISelectableOption<T = any> {
  /**
   * Arbitrary string associated with this option.
   */
  key: string | number;

  /**
   * ID attribute associated with this option
   */
  id?: string;

  /**
   * Text to render for this option
   */
  text: string;

  /**
   * Title attribute (built in tooltip) for a given option.
   */
  title?: string;

  /**
   * Text to render for this option
   */
  itemType?: SelectableOptionMenuItemType;

  /**
   * Index for this option
   */
  index?: number;

  /**
   * The aria label for the dropdown option. If not present, the `text` will be used.
   */
  ariaLabel?: string;

  /** If option is selected. */
  selected?: boolean;

  /**
   * Whether the option is disabled
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Defines whether the option is hidden or not.
   * @defaultvalue false
   */
  hidden?: boolean;

  /**
   * Data available to custom onRender functions.
   */
  data?: T;
}

export enum SelectableOptionMenuItemType {
  Normal = 0,
  Divider = 1,
  Header = 2,
}
