import * as React from 'react';
import { DatePicker } from './DatePicker';

export interface IDatePickerProps extends React.Props<DatePicker> {
  /**
   * Callback issued when a date is selected
   */
  onSelectDate?: (date: Date) => void;

  /**
   * Label for the DatePicker
   */
  label?: string;

  /**
   * Whether the DatePicker is a required field or not
   * @defaultvalue false
   */
  isRequired?: boolean;

  /**
   * Aria Label for TextField of the DatePicker for screen reader users.
   */
  ariaLabel?: string;

  /**
   * Whether the month picker is shown beside the day picker or hidden.
   * @defaultvalue true
   */
  isMonthPickerVisible?: boolean;

  /**
   * Whether the DatePicker allows input a date string directly or not
   * @defaultvalue false
   */
  allowTextInput?: boolean;

  /**
   * Placeholder text for the DatePicker
   */
  placeholder?: string;

  /**
   * Default value of the DatePicker, if any
   */
  value?: Date;

  /**
   * Optional method to format the chosen date to a string to display in the DatePicker
   * @defaultvalue date.toString()
   */
  formatDate?: (date: Date) => string;

  /**
   * Optional method to parse the text input value to date, it is only useful when allowTextInput is set to true
   * @defaultvalue new Date(Date.parse(dateStr))
   */
  parseDateFromString?: (dateStr: string) => Date;

  /**
   * The first day of the week for your locale.
   * @defaultvalue DayOfWeek.Sunday
   */
  firstDayOfWeek?: DayOfWeek;

  /**
   * Localized strings to use in the DatePicker
   */
  strings: IDatePickerStrings;

  /**
  * Locales to use for rendering date strings, in descending order of priority.
  * Use BCP 47 language tags (eg., 'en-us')
  * @defaultvalue navigator.language
  */
  locales?: string[];
}

export enum DayOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

export interface IDatePickerStrings {
  /**
   * @deprecated
   * Deprecated at v0.57.0, to be removed at >= v1.0.0. Provide the appropriate locale instead.
   */
  months?: string[];

  /**
   * @deprecated
   * Deprecated at v0.57.0, to be removed at >= v1.0.0. Provide the appropriate locale instead.
   */
  shortMonths?: string[];

  /**
   * @deprecated
   * Deprecated at v0.57.0, to be removed at >= v1.0.0. Provide the appropriate locale instead.
   */
  days?: string[];

  /**
   * @deprecated
   * Deprecated at v0.57.0, to be removed at >= v1.0.0. Provide the appropriate locale instead.
   */
  shortDays?: string[];

  /**
   * String to render for button to direct the user to today's date.
   */
  goToToday: string;

  /**
   * Error message to render for TextField if isRequired validation fails.
   */
  isRequiredErrorMessage?: string;

  /**
   * Error message to render for TextField if input date string parsing fails.
   */
  invalidInputErrorMessage?: string;
}
