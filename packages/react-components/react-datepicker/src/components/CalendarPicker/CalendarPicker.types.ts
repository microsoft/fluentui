import { AnimationDirection } from '../Calendar/Calendar.types';
import type { Slot } from '@fluentui/react-utilities';
import type { IStyle } from '@fluentui/style-utilities';

export type CalendarPickerSlots = {
  root: Slot<'div'>;
};

/**
 * {@docCategory Calendar}
 */
export interface CalendarPickerStyleProps {
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
export interface CalendarPickerStyles {
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
