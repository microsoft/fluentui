import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  css,
  getId,
  getRTL,
  getRTLSafeKeyCode
} from '../../Utilities';
import { ICalendarStrings, ICalendarIconStrings, ICalendarFormatDateCallbacks } from './Calendar.types';
import { DayOfWeek, FirstWeekOfYear, DateRangeType } from '../../utilities/dateValues/DateValues';
import { FocusZone } from '../../FocusZone';
import { Icon } from '../../Icon';
import {
  addDays,
  addWeeks,
  addMonths,
  compareDates,
  compareDatePart,
  getDateRangeArray,
  isInDateRangeArray,
  getWeekNumber,
  getWeekNumbersInMonth,
  getMonthStart,
  getMonthEnd
} from '../../utilities/dateMath/DateMath';

import * as stylesImport from './Calendar.scss';
const styles: any = stylesImport;

const DAYS_IN_WEEK = 7;

export interface IDayInfo {
  key: string;
  date: string;
  originalDate: Date;
  isInMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInBounds: boolean;
  onSelected: () => void;
}

export interface ICalendarDay {
  focus(): void;
}

export interface ICalendarDayProps extends React.Props<CalendarDay> {
  componentRef?: (c: ICalendarDay) => void;
  strings: ICalendarStrings;
  selectedDate: Date;
  navigatedDate: Date;
  onSelectDate: (date: Date, selectedDateRangeArray?: Date[]) => void;
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
  onDismiss?: () => void;
  firstDayOfWeek: DayOfWeek;
  dateRangeType: DateRangeType;
  autoNavigateOnSelection: boolean;
  navigationIcons: ICalendarIconStrings;
  today?: Date;
  onHeaderSelect?: (focus: boolean) => void;
  showWeekNumbers?: boolean;
  firstWeekOfYear: FirstWeekOfYear;
  dateTimeFormatter: ICalendarFormatDateCallbacks;
  showSixWeeksByDefault?: boolean;
  minDate?: Date;
  maxDate?: Date;
  workWeekDays?: DayOfWeek[];
}

export interface ICalendarDayState {
  activeDescendantId?: string;
  weeks?: IDayInfo[][];
}

interface IWeekCorners {
  [key: string]: string;
}

export class CalendarDay extends BaseComponent<ICalendarDayProps, ICalendarDayState> {
  public refs: {
    [key: string]: React.ReactInstance;
    navigatedDay: HTMLElement;
  };

  public constructor(props: ICalendarDayProps) {
    super(props);

    this.state = {
      activeDescendantId: getId('DatePickerDay-active'),
      weeks: this._getWeeks(props)
    };

    this._onSelectNextMonth = this._onSelectNextMonth.bind(this);
    this._onSelectPrevMonth = this._onSelectPrevMonth.bind(this);
  }

  public componentWillReceiveProps(nextProps: ICalendarDayProps) {
    this.setState({
      weeks: this._getWeeks(nextProps)
    });
  }

  public render() {
    const { activeDescendantId, weeks } = this.state;
    const { firstDayOfWeek, strings, navigatedDate, selectedDate, dateRangeType, navigationIcons, showWeekNumbers, firstWeekOfYear, dateTimeFormatter, minDate, maxDate } = this.props;
    const dayPickerId = getId('DatePickerDay-dayPicker');
    const monthAndYearId = getId('DatePickerDay-monthAndYear');
    const leftNavigationIcon = navigationIcons.leftNavigation;
    const rightNavigationIcon = navigationIcons.rightNavigation;
    const weekNumbers = showWeekNumbers ? getWeekNumbersInMonth(weeks!.length, firstDayOfWeek, firstWeekOfYear, navigatedDate) : null;
    const selectedDateWeekNumber = showWeekNumbers ? getWeekNumber(selectedDate, firstDayOfWeek, firstWeekOfYear) : undefined;

    // When the month is highlighted get the corner dates so that styles can be added to them
    let weekCorners: IWeekCorners = {};
    if (dateRangeType === DateRangeType.Month && selectedDate.getMonth() === navigatedDate.getMonth() && selectedDate.getFullYear() === navigatedDate.getFullYear()) {
      // navigatedDate is on the current month and current year
      weekCorners = this._getWeekCornerStyles(weeks!);
    }

    // determine if previous/next months are in bounds
    const prevMonthInBounds = minDate ? compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true;
    const nextMonthInBounds = maxDate ? compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true;

    return (
      <div
        className={ css('ms-DatePicker-dayPicker',
          styles.dayPicker,
          showWeekNumbers && 'ms-DatePicker-showWeekNumbers' && (getRTL() ? styles.showWeekNumbersRTL : styles.showWeekNumbers)
        ) }
        id={ dayPickerId }
      >
        <div className={ css('ms-DatePicker-monthComponents', styles.monthComponents) }>
          <div className={ css('ms-DatePicker-navContainer', styles.navContainer) }>
            <button
              className={ css('ms-DatePicker-prevMonth js-prevMonth', styles.prevMonth,
                {
                  ['ms-DatePicker-prevMonth--disabled ' + styles.prevMonthIsDisabled]: !prevMonthInBounds
                }
              ) }
              onClick={ this._onSelectPrevMonth }
              onKeyDown={ this._onPrevMonthKeyDown }
              aria-controls={ dayPickerId }
              aria-label={ strings.prevMonthAriaLabel ? strings.prevMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, -1).getMonth()] : undefined }
              role='button'
              tabIndex={ 0 }
            >
              <Icon iconName={ leftNavigationIcon } />
            </button >
            <button
              className={ css('ms-DatePicker-nextMonth js-nextMonth', styles.nextMonth,
                {
                  ['ms-DatePicker-nextMonth--disabled ' + styles.nextMonthIsDisabled]: !nextMonthInBounds
                }) }
              onClick={ this._onSelectNextMonth }
              onKeyDown={ this._onNextMonthKeyDown }
              aria-controls={ dayPickerId }
              aria-label={ strings.nextMonthAriaLabel ? strings.nextMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, 1).getMonth()] : undefined }
              role='button'
              tabIndex={ 0 }
            >
              <Icon iconName={ rightNavigationIcon } />
            </button >
          </div >
        </div >
        <div className={ css('ms-DatePicker-header', styles.header) } >
          <div aria-live='polite' aria-relevant='text' aria-atomic='true' id={ monthAndYearId }>
            { this.props.onHeaderSelect ?
              <div
                className={ css('ms-DatePicker-monthAndYear js-showMonthPicker', styles.monthAndYear, styles.headerToggleView) }
                onClick={ this._onHeaderSelect }
                onKeyDown={ this._onHeaderKeyDown }
                aria-label={ dateTimeFormatter.formatMonthYear(navigatedDate, strings) }
                role='button'
                tabIndex={ 0 }
              >
                { dateTimeFormatter.formatMonthYear(navigatedDate, strings) }
              </div>
              :
              <div className={ css('ms-DatePicker-monthAndYear', styles.monthAndYear) }>
                { dateTimeFormatter.formatMonthYear(navigatedDate, strings) }
              </div>
            }
          </div>
        </div>
        <FocusZone>
          {
            showWeekNumbers ?
              <table
                className={ css('ms-DatePicker-weekNumbers', styles.weekNumbers, 'ms-DatePicker-table', styles.table) }
              >
                <tbody>
                  { weekNumbers!.map((weekNumber, index) =>
                    <tr key={ index }>
                      <td>
                        <div
                          className={ css(
                            'ms-DatePicker-day',
                            styles.day,
                            {
                              ['ms-DatePicker-week--highlighted ' + styles.weekIsHighlighted]: selectedDateWeekNumber === weekNumber
                            }
                          ) }
                        >
                          <span>{ weekNumber }</span>
                        </div>
                      </td>
                    </tr>
                  ) }
                </tbody>
              </table>
              : null
          }
          <table
            className={ css('ms-DatePicker-table', styles.table) }
            aria-readonly='true'
            aria-multiselectable='false'
            aria-labelledby={ monthAndYearId }
            aria-activedescendant={ activeDescendantId }
          >
            <thead>
              <tr>
                { strings.shortDays.map((val, index) =>
                  <th
                    className={ css('ms-DatePicker-weekday', styles.weekday) }
                    role='grid'
                    scope='col'
                    key={ index }
                    title={ strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK] }
                    aria-label={ strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK] }
                  >
                    { strings.shortDays[(index + firstDayOfWeek) % DAYS_IN_WEEK] }
                  </th>) }
              </tr>
            </thead>
            <tbody>
              { weeks!.map((week, weekIndex) =>
                <tr key={ weekIndex } role='row'>
                  { week.map((day, dayIndex) => {
                    const isNavigatedDate = compareDates(navigatedDate, day.originalDate);
                    return <td
                      key={ day.key }
                      className={ css(
                        {
                          ['ms-DatePicker-weekBackground ' + styles.weekBackground]: day.isSelected && (dateRangeType === DateRangeType.Week || dateRangeType === DateRangeType.WorkWeek),
                          ['ms-DatePicker-monthBackground ' + styles.monthBackground + ' ' + this._getHighlightedCornerStyle(weekCorners, dayIndex, weekIndex)]: day.isInMonth && day.isSelected && dateRangeType === DateRangeType.Month,
                          ['ms-DatePicker-dayBackground ' + styles.dayBackground]: day.isSelected && dateRangeType === DateRangeType.Day
                        }) }
                    >
                      <div
                        className={ css(
                          'ms-DatePicker-day',
                          styles.day,
                          {
                            ['ms-DatePicker-day--disabled ' + styles.dayIsDisabled]: !day.isInBounds,
                            ['ms-DatePicker-day--infocus ' + styles.dayIsFocused]: day.isInBounds && day.isInMonth,
                            ['ms-DatePicker-day--outfocus ' + styles.dayIsUnfocused]: day.isInBounds && !day.isInMonth,
                            ['ms-DatePicker-day--today ' + styles.dayIsToday]: day.isToday,
                            ['ms-DatePicker-day--highlighted ' + styles.dayIsHighlighted]: day.isSelected && dateRangeType === DateRangeType.Day
                          }) }
                        role={ 'gridcell' }
                        onClick={ day.isInBounds ? day.onSelected : undefined }
                        onKeyDown={ this._onDayKeyDown(day.originalDate, weekIndex, dayIndex) }
                        aria-label={ dateTimeFormatter.formatMonthDayYear(day.originalDate, strings) }
                        id={ isNavigatedDate ? activeDescendantId : undefined }
                        aria-selected={ day.isInBounds ? day.isSelected : undefined }
                        data-is-focusable={ day.isInBounds ? true : undefined }
                        ref={ isNavigatedDate ? 'navigatedDay' : undefined }
                        key={ isNavigatedDate ? 'navigatedDay' : undefined }
                      >
                        <span aria-hidden='true'>{ dateTimeFormatter.formatDay(day.originalDate) }</span>
                      </div>
                    </td>;
                  }) }
                </tr>
              ) }
            </tbody>
          </table>
        </FocusZone>
      </div >
    );
  }

  public focus() {
    if (this.refs.navigatedDay) {
      this.refs.navigatedDay.tabIndex = 0;
      this.refs.navigatedDay.focus();
    }
  }

  private _findCornerIndexes(week: IDayInfo[]) {

    const cornerIndexes = [];

    for (let i = 0, length = week.length; i < length; i++) {

      const day = week[i];
      if (day.isInMonth) {
        cornerIndexes.push(i);
      }

    }

    if (cornerIndexes.length > 2) {
      cornerIndexes.splice(1, cornerIndexes.length - 2);
    }

    return cornerIndexes;
  }

  private _populateCornerStyles(
    weekCornersStyled: any,
    weekIndex: number,
    cornerIndexes: number[],
    singleCornerStyle: string,
    leftCornerStyle: string,
    rightCornerStyle: string) {

    const cornersLength = cornerIndexes.length;
    if (cornersLength > 0) {

      if (cornersLength === 1) {

        weekCornersStyled[weekIndex + '_' + cornerIndexes[0]] = singleCornerStyle;

      } else if (cornersLength === 2) {

        weekCornersStyled[weekIndex + '_' + cornerIndexes[0]] = leftCornerStyle;
        weekCornersStyled[weekIndex + '_' + cornerIndexes[1]] = rightCornerStyle;
      }

      if (weekIndex === 0) {

        // check if second week needs corner styles
        if (cornerIndexes[0] !== 0) {
          weekCornersStyled['1_0'] = leftCornerStyle;
        }

      } else {

        // Assume we are on the last week. Check if second-to-last week needs corner styles
        const lastDayIndex = DAYS_IN_WEEK - 1;
        if (cornerIndexes[cornersLength - 1] !== lastDayIndex) {
          weekCornersStyled[(weekIndex - 1) + '_' + lastDayIndex] = rightCornerStyle;
        }
      }
    }
  }

  private _getWeekCornerStyles(weeks: IDayInfo[][]) {

    const weekCornersStyled: any = {};
    const numberOfWeeks = weeks.length;
    const indexesFirstWeek = this._findCornerIndexes(weeks[0]);
    const indexesLastWeek = this._findCornerIndexes(weeks[numberOfWeeks - 1]);

    this._populateCornerStyles(
      weekCornersStyled,
      0 /* week index */,
      indexesFirstWeek,
      'ms-DatePicker-singleTopDate ' + styles.singleTopDate,
      'ms-DatePicker-topLeftCornerDate ' + styles.topLeftCornerDate,
      'ms-DatePicker-topRightCornerDate ' + styles.topRightCornerDate
    );

    this._populateCornerStyles(
      weekCornersStyled,
      weeks.length - 1 /* week index */,
      indexesLastWeek,
      'ms-DatePicker-singleBottomDate ' + styles.singleBottomDate,
      'ms-DatePicker-bottomLeftCornerDate ' + styles.bottomLeftCornerDate,
      'ms-DatePicker-bottomRightCornerDate ' + styles.bottomRightCornerDate
    );

    return weekCornersStyled;
  }

  private _getHighlightedCornerStyle(weekCorners: IWeekCorners, dayIndex: number, weekIndex: number) {
    const cornerStyle = weekCorners[weekIndex + '_' + dayIndex] ? weekCorners[weekIndex + '_' + dayIndex] : '';

    return cornerStyle;
  }

  private _navigateMonthEdge(ev: React.KeyboardEvent<HTMLElement>, date: Date, weekIndex: number, dayIndex: number) {
    const { minDate, maxDate } = this.props;
    let targetDate: Date | undefined = undefined;

    if (weekIndex === 0 && ev.which === KeyCodes.up) {
      targetDate = addWeeks(date, -1);
    } else if (weekIndex === (this.state.weeks!.length - 1) && ev.which === KeyCodes.down) {
      targetDate = addWeeks(date, 1);
    } else if (dayIndex === 0 && ev.which === getRTLSafeKeyCode(KeyCodes.left)) {
      targetDate = addDays(date, -1);
    } else if (dayIndex === (DAYS_IN_WEEK - 1) && ev.which === getRTLSafeKeyCode(KeyCodes.right)) {
      targetDate = addDays(date, 1);
    }

    // Don't navigate to out-of-bounds date
    if (targetDate && (minDate ? compareDatePart(minDate, targetDate) < 1 : true) && (maxDate ? compareDatePart(targetDate, maxDate) < 1 : true)) {
      this.props.onNavigateDate(targetDate, true);
      ev.preventDefault();
    }
  }

  private _onKeyDown = (callback: () => void, ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      callback();
    }
  }

  private _onDayKeyDown = (originalDate: Date, weekIndex: number, dayIndex: number)
    : (ev: React.KeyboardEvent<HTMLElement>) => void => {
    return (ev: React.KeyboardEvent<HTMLElement>): void => {
      this._navigateMonthEdge(ev, originalDate, weekIndex, dayIndex);
    };
  }

  private _onSelectDate = (selectedDate: Date): void => {
    const {
      onSelectDate,
      dateRangeType,
      firstDayOfWeek,
      navigatedDate,
      autoNavigateOnSelection,
      minDate,
      maxDate,
      workWeekDays
    } = this.props;

    let dateRange = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek, workWeekDays);
    if (dateRangeType !== DateRangeType.Day) {
      dateRange = this._getBoundedDateRange(dateRange, minDate, maxDate);
    }

    if (onSelectDate) {
      onSelectDate(selectedDate, dateRange);
    }

    // Navigate to next or previous month if needed
    if (autoNavigateOnSelection && selectedDate.getMonth() !== navigatedDate.getMonth()) {
      const compareResult = compareDatePart(selectedDate, navigatedDate);
      if (compareResult < 0) {
        this._onSelectPrevMonth();
      } else if (compareResult > 0) {
        this._onSelectNextMonth();
      }
    }
  }

  private _onSelectNextMonth = (): void => {
    this.props.onNavigateDate(addMonths(this.props.navigatedDate, 1), false);
  }

  private _onSelectPrevMonth = (): void => {
    this.props.onNavigateDate(addMonths(this.props.navigatedDate, -1), false);
  }

  private _onHeaderSelect = (): void => {
    const { onHeaderSelect } = this.props;
    if (onHeaderSelect) {
      onHeaderSelect(true);
    }
  }

  private _onHeaderKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const { onHeaderSelect } = this.props;
    if (onHeaderSelect && (ev.which === KeyCodes.enter || ev.which === KeyCodes.space)) {
      onHeaderSelect(true);
    }
  }

  private _onPrevMonthKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    this._onKeyDown(this._onSelectPrevMonth, ev);
  }

  private _onNextMonthKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    this._onKeyDown(this._onSelectNextMonth, ev);
  }

  private _getWeeks(propsToUse: ICalendarDayProps): IDayInfo[][] {
    const {
      navigatedDate,
      selectedDate,
      dateRangeType,
      firstDayOfWeek,
      today,
      minDate,
      maxDate,
      showSixWeeksByDefault,
      workWeekDays
    } = propsToUse;
    const date = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);
    const todaysDate = today || new Date();
    const weeks: IDayInfo[][] = [];

    // Cycle the date backwards to get to the first day of the week.
    while (date.getDay() !== firstDayOfWeek) {
      date.setDate(date.getDate() - 1);
    }

    // a flag to indicate whether all days of the week are in the month
    let isAllDaysOfWeekOutOfMonth = false;

    let selectedDates = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek, workWeekDays);
    if (dateRangeType !== DateRangeType.Day) {
      selectedDates = this._getBoundedDateRange(selectedDates, minDate, maxDate);
    }

    let shouldGetWeeks = true;

    for (let weekIndex = 0; shouldGetWeeks; weekIndex++) {
      const week: IDayInfo[] = [];

      isAllDaysOfWeekOutOfMonth = true;

      for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
        const originalDate = new Date(date.toString());
        const dayInfo: IDayInfo = {
          key: date.toString(),
          date: date.getDate().toString(),
          originalDate: originalDate,
          isInMonth: date.getMonth() === navigatedDate.getMonth(),
          isToday: compareDates(todaysDate, date),
          isSelected: isInDateRangeArray(date, selectedDates),
          onSelected: this._onSelectDate.bind(this, originalDate),
          isInBounds: (minDate ? compareDatePart(minDate, date) < 1 : true) && (maxDate ? compareDatePart(date, maxDate) < 1 : true)
        };

        week.push(dayInfo);

        if (dayInfo.isInMonth) {
          isAllDaysOfWeekOutOfMonth = false;
        }

        date.setDate(date.getDate() + 1);
      }

      // We append the condition of the loop depending upon the showSixWeeksByDefault prop.
      shouldGetWeeks = showSixWeeksByDefault ? (!isAllDaysOfWeekOutOfMonth || weekIndex <= 5) : !isAllDaysOfWeekOutOfMonth;
      if (shouldGetWeeks) {
        weeks.push(week);
      }
    }

    return weeks;
  }

  private _getBoundedDateRange(dateRange: Date[], minDate?: Date, maxDate?: Date): Date[] {
    let boundedDateRange = [...dateRange];
    if (minDate) {
      boundedDateRange = boundedDateRange.filter((date) => compareDatePart(date, minDate as Date) >= 0);
    }
    if (maxDate) {
      boundedDateRange = boundedDateRange.filter((date) => compareDatePart(date, maxDate as Date) <= 0);
    }
    return boundedDateRange;
  }
}