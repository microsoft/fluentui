import { AnimationDirection } from '../Calendar/Calendar.types';

/**
 * @internal
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
 * @internal
 */
export interface CalendarPickerStyles {
  /**
   * Style for the root element.
   */
  root: string;

  headerContainer: string;

  currentItemButton: string;

  navigationButtonsContainer: string;

  navigationButton: string;

  gridContainer: string;

  buttonRow: string;

  itemButton: string;

  current: string;

  selected: string;

  disabled: string;
}
