import { IBaseProps, IRefObject, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import {
  ICalendarStrings,
  DayOfWeek,
  ICalendarFormatDateCallbacks,
  ICalendarIconStrings,
  AnimationDirection
} from '../Calendar/Calendar.types';
import { IStyle, ITheme } from '@uifabric/styling';
import { ICalendarDayGridStyleProps, ICalendarDayGridStyles } from '../CalendarDayGrid/CalendarDayGrid.types';

export interface IWeeklyDayPicker {
  focus(): void;
}

export interface IWeeklyDayPickerProps extends IBaseProps<IWeeklyDayPicker> {
  /**
   * Optional callback to access the IWeeklyDayPicker interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IWeeklyDayPicker>;

  /**
   * Customized styles for the calendar day component
   */
  styles?: IStyleFunctionOrObject<IWeeklyDayPickerStyleProps, IWeeklyDayPickerStyles>;

  /**
   * Theme (provided through customization).
   */
  theme?: ITheme;

  /**
   * Additional CSS class(es) to apply to the CalendarDay.
   */
  className?: string;

  /**
   * Localized strings to use in the Calendar
   */
  strings: IWeeklyDayPickerStrings;

  /**
   * Customize navigation icons. Only uses previous and next icons
   */
  navigationIcons?: ICalendarIconStrings;

  /**
   * The initially selected date. If not provided, defaults to today's date
   */
  initialDate?: Date;

  /**
   * Callback issued when a date is selected
   * @param date - The date the user selected
   * @param selectedDateRangeArray - The resultant list of dates that are selected based on the date range type set for the component.
   */
  onSelectDate?: (date: Date) => void;

  /**
   * Callback issued when a date in the calendar is navigated
   * @param date - The date that is navigated to
   */
  onNavigateDate?: (date: Date) => void;

  /**
   * The first day of the week for your locale.
   * @defaultvalue DayOfWeek.Sunday
   */
  firstDayOfWeek?: DayOfWeek;

  /**
   * Value of today. If null, current time in client machine will be used.
   */
  today?: Date;

  /**
   * Apply additional formating to dates, for example localized date formatting.
   */
  dateTimeFormatter?: ICalendarFormatDateCallbacks;

  /**
   * If set the Calendar will not allow navigation to or selection of a date earlier than this value.
   */
  minDate?: Date;

  /**
   * If set the Calendar will not allow navigation to or selection of a date later than this value.
   */
  maxDate?: Date;

  /**
   * If set the Calendar will not allow selection of dates in this array.
   */
  restrictedDates?: Date[];

  /**
   * The cardinal directions for animation to occur during transitions, either horizontal or veritcal
   */
  animationDirection?: AnimationDirection;

  /**
   * Whether to show as a month picker. If false, shows only one week
   * @defaultvalue false
   */
  showFullMonth?: boolean;

  /**
   * How many weeks to show if showFullMonth=true. If not provided, will show enough weeks to display the current
   * month, between 4 and 6 depending
   * @defaultvalue undefined
   */
  weeksToShow?: number;
}

export interface IWeeklyDayPickerStrings extends ICalendarStrings {
  /**
   * Aria-label for the "previous week" button in picker.
   */
  prevWeekAriaLabel?: string;

  /**
   * Aria-label for the "next week" button in picker.
   */
  nextWeekAriaLabel?: string;
}

export interface IWeeklyDayPickerStyleProps extends ICalendarDayGridStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;
}

export interface IWeeklyDayPickerStyles extends Partial<ICalendarDayGridStyles> {
  /**
   * Style for the root element.
   */
  root: IStyle;

  /**
   * Style for the root element.
   */
  navigationIconButton: IStyle;

  /**
   * Style for the root element.
   */
  disabledStyle: IStyle;
}
