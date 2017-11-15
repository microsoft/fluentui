export interface ISelectableOption {
  /**
   * Arbitrary string associated with this option.
   */
  key: string | number;

  /**
   * Text to render for this option
   */
  text: string;

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
}

export enum SelectableOptionMenuItemType {
  Normal = 0,
  Divider = 1,
  Header = 2
}