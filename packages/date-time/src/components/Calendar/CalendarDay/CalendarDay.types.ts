import { IBaseProps, IRefObject, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { ICalendarStrings, ICalendarIconStrings, ICalendarFormatDateCallbacks } from '../Calendar.types';
import { IStyle, ITheme } from '@uifabric/styling';
import { ICalendarDayGridProps, ICalendarDayGridStyleProps, ICalendarDayGridStyles } from '../../CalendarDayGrid/CalendarDayGrid.types';

export { ICalendarDayGridStyles };

export interface ICalendarDay {
  focus(): void;
}

export interface ICalendarDayProps extends IBaseProps<ICalendarDay>, ICalendarDayGridProps {
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
   * The currently navigated date
   */
  navigatedDate: Date;

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
   * Customize navigation icons using ICalendarIconStrings
   */
  navigationIcons: ICalendarIconStrings;

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

export interface ICalendarDayStyleProps extends ICalendarDayGridStyleProps {
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
   * Whether week numbers are being shown
   */
  showWeekNumbers?: boolean;
}

export interface ICalendarDayStyles extends Partial<ICalendarDayGridStyles> {
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
}
