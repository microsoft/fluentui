import * as React from 'react';
import { IBaseProps, IRefObject, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { ICalendarIconStrings, AnimationDirection } from '../Calendar.types';
import { ITheme } from '@uifabric/styling';
import { ICalendarPickerStyleProps, ICalendarPickerStyles } from '../CalendarPicker/CalendarPicker.types';

export interface ICalendarYear {
  focus(): void;
}

export interface ICalendarYearRange {
  fromYear: number;
  toYear: number;
}

export interface ICalendarYearRangeToString {
  (range: ICalendarYearRange): string;
}

export interface ICalendarYearStrings {
  rangeAriaLabel?: string | ICalendarYearRangeToString;
  prevRangeAriaLabel?: string | ICalendarYearRangeToString;
  nextRangeAriaLabel?: string | ICalendarYearRangeToString;
  headerAriaLabelFormatString?: string;
}

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
   * @param year The year the user selected
   */
  onSelectYear?: (year: number) => void;

  /**
   * Customize navigation icons using ICalendarIconStrings
   */
  navigationIcons?: ICalendarIconStrings;

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
   * @param props The header props
   */
  onRenderTitle?: (props: ICalendarYearHeaderProps) => React.ReactNode;

  /**
   * Custom renderer for the year
   * @param year The year to render
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
