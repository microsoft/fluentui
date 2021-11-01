import { AnimationDirection } from '../Calendar/Calendar.types';
import { DayOfWeek } from '@fluentui/date-time-utilities';
import type { IBaseProps, IRefObject, IStyleFunctionOrObject } from '@fluentui/utilities';
import type { ICalendarNavigationIcons } from '../Calendar/Calendar.types';
import type { ICalendarStrings, IDateFormatting } from '@fluentui/date-time-utilities';
import type { IStyle, ITheme } from '@fluentui/style-utilities';
import type {
  ICalendarDayGridProps,
  ICalendarDayGridStyleProps,
  ICalendarDayGridStyles,
} from '../CalendarDayGrid/CalendarDayGrid.types';

/**
 * {@docCategory WeeklyDayPicker}
 */
export interface IWeeklyDayPicker {
  focus(): void;
}

/**
 * {@docCategory WeeklyDayPicker}
 */
export interface IWeeklyDayPickerProps extends IBaseProps<IWeeklyDayPicker>, Partial<ICalendarDayGridProps> {
  /**
   * Optional callback to access the IWeeklyDayPicker interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IWeeklyDayPicker>;

  /**
   * Customized styles for the component.
   */
  styles?: IStyleFunctionOrObject<IWeeklyDayPickerStyleProps, IWeeklyDayPickerStyles>;

  /**
   * Theme (provided through customization).
   */
  theme?: ITheme;

  /**
   * Additional CSS class(es) to apply to the WeeklyDayPicker.
   */
  className?: string;

  /**
   * Localized strings to use in the WeeklyDayPicker
   */
  strings: IWeeklyDayPickerStrings;

  /**
   * Customize navigation icons.
   */
  navigationIcons?: IWeeklyDayPickerNavigationIcons;

  /**
   * The initially selected date.
   * @default Today's date (`new Date()`)
   */
  initialDate?: Date;

  /**
   * Callback issued when a date is selected
   * @param date - The date the user selected
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
   * Value of today. If unspecified, current time in client machine will be used.
   */
  today?: Date;

  /**
   * Apply additional formatting to dates, for example localized date formatting.
   */
  dateTimeFormatter?: IDateFormatting;

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

/**
 * {@docCategory WeeklyDayPicker}
 */
export type IWeeklyDayPickerNavigationIcons = Pick<ICalendarNavigationIcons, 'leftNavigation' | 'rightNavigation'>;

/**
 * {@docCategory WeeklyDayPicker}
 */
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

/**
 * {@docCategory WeeklyDayPicker}
 */
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

/**
 * {@docCategory WeeklyDayPicker}
 */
export interface IWeeklyDayPickerStyles extends Partial<ICalendarDayGridStyles> {
  /**
   * Style for the root element.
   */
  root: IStyle;

  /**
   * Style for navigation icon button.
   */
  navigationIconButton: IStyle;

  /**
   * Style for disabled element
   */
  disabledStyle: IStyle;
}
