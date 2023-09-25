import * as React from 'react';
import { AnimationDirection } from '../Calendar.types';
import type { IBaseProps, IRefObject, IStyleFunctionOrObject } from '@fluentui/utilities';
import type { ICalendarNavigationIcons } from '../Calendar.types';
import type { ITheme } from '@fluentui/style-utilities';
import type { ICalendarPickerStyleProps, ICalendarPickerStyles } from '../CalendarPicker/CalendarPicker.types';

/**
 * {@docCategory Calendar}
 */
export interface ICalendarYear {
  focus(): void;
}

/**
 * {@docCategory Calendar}
 */
export interface ICalendarYearRange {
  fromYear: number;
  toYear: number;
}

/**
 * {@docCategory Calendar}
 */
export interface ICalendarYearRangeToString {
  (range: ICalendarYearRange): string;
}

/**
 * {@docCategory Calendar}
 */
export interface ICalendarYearStrings {
  rangeAriaLabel?: string | ICalendarYearRangeToString;
  prevRangeAriaLabel?: string | ICalendarYearRangeToString;
  nextRangeAriaLabel?: string | ICalendarYearRangeToString;
  headerAriaLabelFormatString?: string;
}

/**
 * {@docCategory Calendar}
 */
export interface ICalendarYearProps extends IBaseProps<ICalendarYear> {
  /**
   * Optional callback to access the ICalendarYear interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ICalendarYear>;

  /**
   * Customized styles for the calendar month component
   */
  styles?: IStyleFunctionOrObject<ICalendarYearStyleProps, ICalendarYearStyles>;

  /**
   * Theme (provided through customization).
   */
  theme?: ITheme;

  /**
   * Localized strings to use in the Calendar
   */
  strings?: ICalendarYearStrings;

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
  navigationIcons?: ICalendarNavigationIcons;

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
  onRenderTitle?: (props: ICalendarYearHeaderProps) => React.ReactNode;

  /**
   * Custom renderer for the year
   */
  onRenderYear?: (year: number) => React.ReactNode;

  /**
   * The cardinal directions for animation to occur during transitions, either horizontal or veritcal
   */
  animationDirection?: AnimationDirection;
}

export interface ICalendarYearStyleProps extends ICalendarPickerStyleProps {}

export interface ICalendarYearStyles extends ICalendarPickerStyles {}

export interface ICalendarYearHeaderProps extends ICalendarYearProps, ICalendarYearRange {
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
