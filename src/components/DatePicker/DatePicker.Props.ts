import * as React from 'react';
import DatePicker from './DatePicker';

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
   * Placeholder text for the DatePicker
   */
  placeholder?: string;

  /**
   * Default value of the DatePicker, if any
   */
  value?: Date;

  /**
   * Method to format the chosen date to a string to display in the DatePicker
   * @defaultvalue date.toString()
   */
  format?: (date: Date) => string;

  /**
   * The first day of the week for your locale.
   * @defaultvalue DayOfWeek.Sunday
   */
  firstDayOfWeek?: DayOfWeek;

  /**
   * Localized strings to use in the DatePicker
   */
  strings: IDatePickerStrings;
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
   * An array of strings for the full names of months.
   * The array is 0-based, so months[0] should be the full name of January.
   */
  months: string[];

  /**
   * An array of strings for the short names of months.
   * The array is 0-based, so shortMonths[0] should be the short name of January.
   */
  shortMonths: string[];

  /**
   * An array of strings for the full names of days of the week.
   * The array is 0-based, so days[0] should be the full name of Sunday.
   */
  days: string[];

  /**
   * An array of strings for the initials of the days of the week.
   * The array is 0-based, so days[0] should be the initial of Sunday.
   */
  shortDays: string[];

  /**
   * String to render for button to direct the user to today's date.
   */
  goToToday: string;
}