import { IBaseProps, IRefObject, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import {
  ICalendarStrings,
  DayOfWeek,
  FirstWeekOfYear,
  DateRangeType,
  ICalendarIconStrings,
  ICalendarFormatDateCallbacks
} from '../Calendar.types';
import { IStyle, ITheme } from '@uifabric/styling';

export interface ICalendarDay {
  focus(): void;
}

export interface ICalendarDayProps extends IBaseProps<ICalendarDay> {
  /**
   * Optional callback to access the ICalendarDay interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ICalendarDay>;

  /**
   * Customized styles for the calendar day component
   */
  styles?: IStyleFunctionOrObject<ICalendarDayStyleProps, ICalendarDayStyles>;

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
  strings: ICalendarStrings;

  /**
   * The currently selected date
   */
  selectedDate: Date;

  /**
   * The currently navigated date
   */
  navigatedDate: Date;

  /**
   * Callback issued when a date is selected
   * @param date - The date the user selected
   * @param selectedDateRangeArray - The resultant list of dates that are selected based on the date range type set for the component.
   */
  onSelectDate?: (date: Date, selectedDateRangeArray?: Date[]) => void;

  /**
   * Callback issued when a date in the calendar is navigated
   * @param date - The date that is navigated to
   * @param focusOnNavigatedDay - Whether to set the focus to the navigated date.
   */
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;

  /**
   * Callback issued when calendar day is closed
   */
  onDismiss?: () => void;

  /**
   * The first day of the week for your locale.
   * @defaultvalue DayOfWeek.Sunday
   */
  firstDayOfWeek: DayOfWeek;

  /**
   * Defines when the first week of the year should start, FirstWeekOfYear.FirstDay,
   * FirstWeekOfYear.FirstFullWeek or FirstWeekOfYear.FirstFourDayWeek are the possible values
   * @defaultvalue FirstWeekOfYear.FirstDay
   */
  firstWeekOfYear: FirstWeekOfYear;

  /**
   * The date range type indicating how  many days should be selected as the user
   * selects days
   * @defaultValue DateRangeType.Day
   */
  dateRangeType: DateRangeType;

  /**
   * Customize navigation icons using ICalendarIconStrings
   */
  navigationIcons: ICalendarIconStrings;

  /**
   * Value of today. If null, current time in client machine will be used.
   */
  today?: Date;

  /**
   * Callback function when the header is selected
   */
  onHeaderSelect?: () => void;

  /**
   * Whether the calendar should show the week number (weeks 1 to 53) before each week row
   * @defaultvalue false
   */
  showWeekNumbers?: boolean;

  /**
   * Apply additional formating to dates, for example localized date formatting.
   */
  dateTimeFormatter: ICalendarFormatDateCallbacks;

  /**
   * Whether the calendar should show 6 weeks by default.
   * @defaultvalue false
   */
  showSixWeeksByDefault?: boolean;

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
   * The days that are selectable when dateRangeType is WorkWeek. If dateRangeType is not WorkWeek this property does nothing.
   * @defaultvalue [Monday,Tuesday,Wednesday,Thursday,Friday]
   */
  workWeekDays?: DayOfWeek[];

  /**
   * Whether the close button should be shown or not
   * @defaultvalue false
   */
  showCloseButton?: boolean;

  /**
   * Allows all dates and buttons to be focused, including disabled ones
   * @defaultvalue false
   */
  allFocusable?: boolean;
}

export interface ICalendarDayStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  // Insert CalendarDay style props below

  /**
   * Whether the header is clickable
   */
  headerIsClickable?: boolean;

  /**
   * The date range type
   */
  dateRangeType?: DateRangeType;

  /**
   * Whether week numbers are being shown
   */
  showWeekNumbers?: boolean;
}

export interface ICalendarDayStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;

  /**
   * The style for the header button and forward/back navigation button container
   */
  header: IStyle;

  /**
   * The style for the title text inside the header
   */
  monthAndYear: IStyle;

  /**
   * The style for the table containing the grid
   */
  table: IStyle;

  /**
   * The style for the wrapper around forward/back/close buttons
   */
  monthComponents: IStyle;

  /**
   * The style for the forward/back/close buttons
   */
  headerIconButton: IStyle;

  /**
   * The style to apply for disabled elements
   */
  disabledStyle: IStyle;

  /**
   * The style to apply to the grid cells for days
   */
  dayCell: IStyle;

  /**
   * The style to apply to grid cells for days in the selected range
   */
  daySelected: IStyle;

  /**
   * The style to apply to grid cells for week numbers
   */
  weekNumberCell: IStyle;

  /**
   * The style to apply to individual days that are outside the min/max date range
   */
  dayOutsideBounds: IStyle;

  /**
   * The style to apply to individual days that are outside the current month
   */
  dayOutsideNavigatedMonth: IStyle;

  /**
   * The style to apply to the button element within the day cells
   */
  dayButton: IStyle;

  /**
   * The style to apply to the individual button element that matches the "today" parameter
   */
  dayIsToday: IStyle;

  /**
   * The styles to apply to days for rounded corners. Can apply multiple to round multiple corners
   */
  topRightCornerDate: IStyle;
  topLeftCornerDate: IStyle;
  bottomRightCornerDate: IStyle;
  bottomLeftCornerDate: IStyle;
}
