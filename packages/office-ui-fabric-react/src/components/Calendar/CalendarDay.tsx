import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css,
  getId,
  getRTL,
  getRTLSafeKeyCode
} from '../../Utilities';
import { ICalendarStrings, ICalendarIconStrings, ICalendarFormatDateCallbacks } from './Calendar.Props';
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
  getWeekNumber
} from '../../utilities/dateMath/DateMath';
import TimeConstants from '../../utilities/dateValues/TimeConstants';

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
  onSelected: () => void;
}

export interface ICalendarDayProps extends React.Props<CalendarDay> {
  componentRef?: () => void;
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
    let { activeDescendantId, weeks } = this.state;
    let { firstDayOfWeek, strings, navigatedDate, selectedDate, dateRangeType, navigationIcons, showWeekNumbers, firstWeekOfYear, dateTimeFormatter } = this.props;
    let dayPickerId = getId('DatePickerDay-dayPicker');
    let monthAndYearId = getId('DatePickerDay-monthAndYear');
    let leftNavigationIcon = navigationIcons.leftNavigation;
    let rightNavigationIcon = navigationIcons.rightNavigation;
    let weekNumbers = showWeekNumbers ? this._getWeekNumbersInMonth(weeks!.length, firstDayOfWeek, firstWeekOfYear, navigatedDate) : null;
    let selectedDateWeekNumber = showWeekNumbers ? getWeekNumber(selectedDate, firstDayOfWeek, firstWeekOfYear) : undefined;

    // When the month is highlighted get the corner dates so that styles can be added to them
    let weekCorners: IWeekCorners = {};
    if (
      dateRangeType === DateRangeType.Month &&
      selectedDate.getMonth() === navigatedDate.getMonth() &&
      selectedDate.getFullYear() === navigatedDate.getFullYear()
    ) {
      // navigatedDate is on the current month and current year
      weekCorners = this._getWeekCornerStyles(weeks!);
    }
    return (
      <div
        className={ css('ms-DatePicker-dayPicker',
          styles.dayPicker,
          showWeekNumbers &&
          'ms-DatePicker-showWeekNumbers' &&
          styles.showWeekNumbers
        ) }
        id={ dayPickerId }
      >
        <div className={ css('ms-DatePicker-monthComponents', styles.monthComponents) } >
          <div className={ css('ms-DatePicker-navContainer', styles.navContainer) } >
            <span
              className={ css('ms-DatePicker-prevMonth js-prevMonth', styles.prevMonth) }
              onClick={ this._onSelectPrevMonth }
              onKeyDown={ this._onPrevMonthKeyDown }
              aria-controls={ dayPickerId }
              aria-label={ strings.prevMonthAriaLabel ? (strings.prevMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, -1).getMonth()]) : (undefined) }
              role='button'
              tabIndex={ 0 }
            >
              <Icon iconName={ getRTL() ? rightNavigationIcon : leftNavigationIcon } />
            </span>
            <span
              className={ css('ms-DatePicker-nextMonth js-nextMonth', styles.nextMonth) }
              onClick={ this._onSelectNextMonth }
              onKeyDown={ this._onNextMonthKeyDown }
              aria-controls={ dayPickerId }
              aria-label={ strings.nextMonthAriaLabel ? (strings.nextMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, 1).getMonth()]) : (undefined) }
              role='button'
              tabIndex={ 0 }
            >
              <Icon iconName={ getRTL() ? leftNavigationIcon : rightNavigationIcon } />
            </span>
          </div>
        </div>
        <div className={ css('ms-DatePicker-header', styles.header) }>
          <div aria-live='polite' aria-relevant='text' aria-atomic='true' id={ monthAndYearId } >
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
              <div className={ css('ms-DatePicker-monthAndYear', styles.monthAndYear) } >
                { dateTimeFormatter.formatMonthYear(navigatedDate, strings) }
              </div>
            }
          </div>
        </div>
        <FocusZone>
          { showWeekNumbers ? (
            <table
              className={ css('ms-DatePicker-weekNumbers', styles.weekNumbers, 'ms-DatePicker-table', styles.table) } >
              <tbody>
                { weekNumbers!.map((weekNumber, index) => (
                  <tr key={ index }>
                    <td>
                      <div
                        className={ css('ms-DatePicker-day', styles.day, {
                          ['ms-DatePicker-week--highlighted ' + styles.weekIsHighlighted]: selectedDateWeekNumber === weekNumber
                        }
                        ) }
                      >
                        <span>{ weekNumber }</span>
                      </div>
                    </td>
                  </tr>
                )) }
              </tbody>
            </table>
          ) : null }
          <table
            className={ css('ms-DatePicker-table', styles.table) }
            aria-readonly='true'
            aria-multiselectable='false'
            aria-labelledby={ monthAndYearId }
            aria-activedescendant={ activeDescendantId }
          >
            <thead>
              <tr>
                { strings.shortDays.map((val, index) => (
                  <th
                    className={ css('ms-DatePicker-weekday', styles.weekday) }
                    role='grid'
                    scope='col'
                    key={ index }
                    title={ strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK] }
                    aria-label={ strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK] }
                  >
                    { strings.shortDays[(index + firstDayOfWeek) % DAYS_IN_WEEK] }
                  </th>
                )) }
              </tr>
            </thead>
            <tbody>
              { weeks!.map((week, weekIndex) =>
                <tr key={ weekIndex } role='row'>
                  { week.map((day, dayIndex) =>
                    <td
                      key={ day.key }
                      className={ css({
                        ['ms-DatePicker-weekBackground ' + styles.weekBackground]: day.isSelected && dateRangeType === DateRangeType.Week,
                        ['ms-DatePicker-monthBackground ' + styles.monthBackground + ' ' + this._getHighlightedCornerStyle(weekCorners, dayIndex, weekIndex)]: day.isInMonth && day.isSelected && dateRangeType === DateRangeType.Month,
                        ['ms-DatePicker-dayBackground ' + styles.dayBackground]: day.isSelected && dateRangeType === DateRangeType.Day
                      }) }
                    >
                      <div
                        className={ css(
                          'ms-DatePicker-day',
                          styles.day,
                          {
                            ['ms-DatePicker-day--infocus ' + styles.dayIsFocused]: day.isInMonth,
                            ['ms-DatePicker-day--outfocus ' + styles.dayIsUnfocused]: !day.isInMonth,
                            ['ms-DatePicker-day--today ' + styles.dayIsToday]: day.isToday,
                            ['ms-DatePicker-day--highlighted ' + styles.dayIsHighlighted]: day.isSelected && dateRangeType === DateRangeType.Day
                          }) }
                        role='gridcell'
                        onClick={ day.onSelected }
                        onKeyDown={ this._onDayKeyDown(day.originalDate, weekIndex, dayIndex) }
                        aria-label={ dateTimeFormatter.formatMonthDayYear(day.originalDate, strings) }
                        id={ compareDates(navigatedDate, day.originalDate) ? activeDescendantId : undefined }
                        aria-selected={ day.isSelected }
                        data-is-focusable={ true }
                        ref={ compareDates(navigatedDate, day.originalDate) ? 'navigatedDay' : undefined }
                        key={ compareDates(navigatedDate, day.originalDate) ? 'navigatedDay' : undefined }
                      >
                        <span aria-hidden='true'> { dateTimeFormatter.formatDay(day.originalDate) } </span>
                      </div>
                    </td>
                  ) }
                </tr>
              ) }
            </tbody>
          </table>
        </FocusZone>
      </div>
    );
  }

  public focus() {
    if (this.refs.navigatedDay) {
      this.refs.navigatedDay.tabIndex = 0;
      this.refs.navigatedDay.focus();
    }
  }

  private _findCornerIndexes(week: IDayInfo[]) {

    let cornerIndexes = [];

    for (let i = 0, length = week.length; i < length; i++) {

      let day = week[i];
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
    let cornersLength = cornerIndexes.length;
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
        let lastDayIndex = DAYS_IN_WEEK - 1;
        if (cornerIndexes[cornersLength - 1] !== lastDayIndex) {
          weekCornersStyled[weekIndex - 1 + '_' + lastDayIndex] = rightCornerStyle;
        }
      }
    }
  }

  private _getWeekCornerStyles(weeks: IDayInfo[][]) {

    let weekCornersStyled: any = {};
    let numberOfWeeks = weeks.length;
    let indexesFirstWeek = this._findCornerIndexes(weeks[0]);
    let indexesLastWeek = this._findCornerIndexes(weeks[numberOfWeeks - 1]);

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
    let cornerStyle = weekCorners[weekIndex + '_' + dayIndex] ? weekCorners[weekIndex + '_' + dayIndex] : '';

    return cornerStyle;
  }

  private _navigateMonthEdge(ev: React.KeyboardEvent<HTMLElement>, date: Date, weekIndex: number, dayIndex: number) {
    if (weekIndex === 0 && ev.which === KeyCodes.up) {
      this.props.onNavigateDate(addWeeks(date, -1), true);
      ev.preventDefault();
    } else if (weekIndex === this.state.weeks!.length - 1 && ev.which === KeyCodes.down) {
      this.props.onNavigateDate(addWeeks(date, 1), true);
      ev.preventDefault();
    } else if (dayIndex === 0 && ev.which === getRTLSafeKeyCode(KeyCodes.left)) {
      this.props.onNavigateDate(addDays(date, -1), true);
      ev.preventDefault();
    } else if (dayIndex === DAYS_IN_WEEK - 1 && ev.which === getRTLSafeKeyCode(KeyCodes.right)) {
      this.props.onNavigateDate(addDays(date, 1), true);
      ev.preventDefault();
    }
  }

  @autobind
  private _onKeyDown(callback: () => void, ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      callback();
    }
  }

  @autobind
  private _onDayKeyDown(originalDate: Date, weekIndex: number, dayIndex: number): (ev: React.KeyboardEvent<HTMLElement>) => void {
    return (ev: React.KeyboardEvent<HTMLElement>): void => {
      this._navigateMonthEdge(ev, originalDate, weekIndex, dayIndex);
    };
  }

  @autobind
  private _onSelectDate(selectedDate: Date) {

    let { onSelectDate, dateRangeType, firstDayOfWeek, navigatedDate, autoNavigateOnSelection } = this.props;

    let dateRange = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek);
    if (onSelectDate) {
      onSelectDate(selectedDate, dateRange);
    }

    // Navigate to next or previous month if needed
    if (autoNavigateOnSelection && selectedDate.getMonth() !== navigatedDate.getMonth()) {
      let compareResult = compareDatePart(selectedDate, navigatedDate);
      if (compareResult < 0) {
        this._onSelectPrevMonth();
      } else if (compareResult > 0) {
        this._onSelectNextMonth();
      }
    }
  }

  @autobind
  private _onSelectNextMonth() {
    this.props.onNavigateDate(addMonths(this.props.navigatedDate, 1), false);
  }

  @autobind
  private _onSelectPrevMonth() {
    this.props.onNavigateDate(addMonths(this.props.navigatedDate, -1), false);
  }

  @autobind
  private _onHeaderSelect() {
    let { onHeaderSelect } = this.props;
    if (onHeaderSelect) {
      onHeaderSelect(true);
    }
  }

  @autobind
  private _onHeaderKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    let { onHeaderSelect } = this.props;
    if (onHeaderSelect && (ev.which === KeyCodes.enter || ev.which === KeyCodes.space)) {
      onHeaderSelect(true);
    }
  }

  @autobind
  private _onPrevMonthKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    this._onKeyDown(this._onSelectPrevMonth, ev);
  }

  @autobind
  private _onNextMonthKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    this._onKeyDown(this._onSelectNextMonth, ev);
  }

  private _getWeeks(propsToUse: ICalendarDayProps): IDayInfo[][] {
    let { navigatedDate, selectedDate, dateRangeType, firstDayOfWeek, today } = propsToUse;
    let date = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);
    let todaysDate = today || new Date();
    let weeks: IDayInfo[][] = [];

    // Cycle the date backwards to get to the first day of the week.
    while (date.getDay() !== firstDayOfWeek) {
      date.setDate(date.getDate() - 1);
    }

    // a flag to indicate whether all days of the week are in the month
    let isAllDaysOfWeekOutOfMonth = false;

    let selectedDates = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek);

    for (let weekIndex = 0; !isAllDaysOfWeekOutOfMonth; weekIndex++) {
      let week: IDayInfo[] = [];

      isAllDaysOfWeekOutOfMonth = true;

      for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
        let originalDate = new Date(date.toString());
        let dayInfo: IDayInfo = {
          key: date.toString(),
          date: date.getDate().toString(),
          originalDate: originalDate,
          isInMonth: date.getMonth() === navigatedDate.getMonth(),
          isToday: compareDates(todaysDate, date),
          isSelected: isInDateRangeArray(date, selectedDates),
          onSelected: this._onSelectDate.bind(this, originalDate)
        };

        week.push(dayInfo);

        if (dayInfo.isInMonth) {
          isAllDaysOfWeekOutOfMonth = false;
        }

        date.setDate(date.getDate() + 1);
      }

      if (!isAllDaysOfWeekOutOfMonth) {
        weeks.push(week);
      }
    }

    return weeks;
  }

  // Returns the week numbers for each week in a month.  Week numbers are 1 - 52 (53) in a year
  private _getWeekNumbersInMonth(weeksInMonth: number, firstDayOfWeek: DayOfWeek, firstWeekOfYear: FirstWeekOfYear, navigatedDate: Date) {
    let selectedYear = navigatedDate.getFullYear();
    let selectedMonth = navigatedDate.getMonth();
    let firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);

    let firstWeekNumber = getWeekNumber( firstDayOfMonth, firstDayOfWeek, firstWeekOfYear );

    let weeksArray = [];
    if (firstWeekNumber < TimeConstants.WeeksInOneYear) {
      for (let i = 0; i < weeksInMonth; i++) {
        weeksArray.push(firstWeekNumber + i);
      }
    } else {
      weeksArray.push(firstWeekNumber);
      for (let i = 1; i < weeksInMonth; i++) {
        weeksArray.push(0 + i);
      }
    }

    return weeksArray;
  }
}
