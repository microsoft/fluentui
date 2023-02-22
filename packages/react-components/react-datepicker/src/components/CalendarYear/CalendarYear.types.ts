import * as React from 'react';
import { AnimationDirection } from '../Calendar/Calendar.types';
import type { CalendarNavigationIcons } from '../Calendar/Calendar.types';
import type { CalendarPickerStyleProps, CalendarPickerStyles } from '../CalendarPicker/CalendarPicker.types';

/**
 * {@docCategory Calendar}
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ICalendarYear {
  focus(): void;
}

/**
 * {@docCategory Calendar}
 */
export interface CalendarYearRange {
  fromYear: number;
  toYear: number;
}

/**
 * {@docCategory Calendar}
 */
export interface CalendarYearRangeToString {
  (range: CalendarYearRange): string;
}

/**
 * {@docCategory Calendar}
 */
export interface CalendarYearStrings {
  rangeAriaLabel?: string | CalendarYearRangeToString;
  prevRangeAriaLabel?: string | CalendarYearRangeToString;
  nextRangeAriaLabel?: string | CalendarYearRangeToString;
  headerAriaLabelFormatString?: string;
}

/**
 * {@docCategory Calendar}
 */
export interface CalendarYearProps {
  /**
   * Optional callback to access the ICalendarYear interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: React.RefObject<ICalendarYear>;

  /**
   * Localized strings to use in the Calendar
   */
  strings?: CalendarYearStrings;

  /**
   * The currently selected year
   */
  selectedYear?: number;

  /**
   * The currently navigated year
   */
  navigatedYear?: number;

  /**
   * Callback action when a year is selected
   * @param year - The year the user selected
   */
  onSelectYear?: (year: number) => void;

  /**
   * Custom navigation icons.
   */
  navigationIcons?: CalendarNavigationIcons;

  /**
   * Callback action when the header is selected
   */
  onHeaderSelect?: (focus: boolean) => void;

  /**
   * If set the Calendar will not allow navigation to or selection of a year earlier than this value.
   */
  minYear?: number;

  /**
   * If set the Calendar will not allow navigation to or selection of a year later than this value.
   */
  maxYear?: number;

  /**
   * Whether the year picker should highlight the current year
   * @defaultvalue false
   */
  highlightCurrentYear?: boolean;

  /**
   * Whether the year picker should highlight the selected year
   * @defaultvalue false
   */
  highlightSelectedYear?: boolean;

  /**
   * Accept custom classNames
   */
  className?: string;

  /**
   * Custom renderer for the title
   */
  onRenderTitle?: (props: CalendarYearHeaderProps) => React.ReactNode;

  /**
   * Custom renderer for the year
   */
  onRenderYear?: (year: number) => React.ReactNode;

  /**
   * The cardinal directions for animation to occur during transitions, either horizontal or veritcal
   */
  animationDirection?: AnimationDirection;
}

export interface CalendarYearStyleProps extends CalendarPickerStyleProps {}

export interface CalendarYearStyles extends CalendarPickerStyles {}

export interface CalendarYearHeaderProps extends CalendarYearProps, CalendarYearRange {
  /**
   * Callback action when the 'previous' navigation button is selected
   */
  onSelectPrev?: () => void;

  /**
   * Callback action when the 'next' navigation button is selected
   */
  onSelectNext?: () => void;

  /**
   * Whether title entering animation should be forwards or backwards
   */
  animateBackwards?: boolean;
}
