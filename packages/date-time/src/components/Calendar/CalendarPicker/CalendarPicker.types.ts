import { IStyle, ITheme } from '@uifabric/styling';

export interface ICalendarPickerStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  /**
   * Whether the header can be clicked
   */
  hasHeaderClickCallback?: boolean;

  /**
   * Whether the picker should highlight the current item
   */
  highlightCurrent?: boolean;

  /**
   * Whether the picker should highlight the selected item
   */
  highlightSelected?: boolean;
}

export interface ICalendarPickerStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;

  headerContainer: IStyle;

  currentItemButton: IStyle;

  navigationButtonsContainer: IStyle;

  navigationButton: IStyle;

  gridContainer: IStyle;

  buttonRow: IStyle;

  itemButton: IStyle;

  current: IStyle;

  selected: IStyle;

  disabled: IStyle;
}
