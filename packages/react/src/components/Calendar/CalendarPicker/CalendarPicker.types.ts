import { AnimationDirection } from '../Calendar.types';
import type { IStyle, ITheme } from '@fluentui/style-utilities';

/**
 * {@docCategory Calendar}
 */
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

  /**
   * The cardinal directions for animation to occur during transitions, either horizontal or veritcal
   */
  animationDirection?: AnimationDirection;

  /**
   * Whether grid entering animation should be forwards or backwards
   */
  animateBackwards?: boolean;
}

/**
 * {@docCategory Calendar}
 */
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
