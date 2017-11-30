import * as React from 'react';
import TimeConstants from '../../utilities/dateValues/TimeConstants';
import {
  addDays,
  addMonths,
  addWeeks,
  compareDatePart,
  compareDates,
  getDateRangeArray,
  getMonthEnd,
  getMonthStart,
  getWeekNumber,
  getWeekNumbersInMonth,
  isInDateRangeArray
} from '../../utilities/dateMath/DateMath';
import {
  autobind,
  BaseComponent,
  classNamesFunction,
  customizable,
  getId,
  getRTL,
  getRTLSafeKeyCode,
  KeyCodes
} from '../../Utilities';
import { DateRangeType } from '../../utilities/dateValues/DateValues';
import { FocusZone } from '../../FocusZone';
import {
  ICalendarDay,
  ICalendarDayProps,
  ICalendarDayStyleProps,
  ICalendarDayStyles
} from './CalendarDay.types';
import { Icon } from '../../Icon';
import { mergeStyles } from '../../Styling';

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

export interface ICalendarDayState {
  activeDescendantId?: string;
  weeks?: IDayInfo[][];
}

interface IWeekCorners {
  [key: string]: string;
}

export type IClassNames<T> = {[key in keyof T]: string };
const getClassNames = classNamesFunction<ICalendarDayStyleProps, ICalendarDayStyles>();

@customizable('Calendar', ['getStyles', 'theme'])
export class CalendarDayBase extends BaseComponent<ICalendarDayProps, ICalendarDayState> implements ICalendarDay {

  private _navigatedDay: HTMLElement;

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
    let {
      firstDayOfWeek,
      strings,
      navigatedDate,
      selectedDate,
      dateRangeType,
      navigationIcons,
      showWeekNumbers,
      firstWeekOfYear,
      dateTimeFormatter,
      minDate,
      maxDate,
      monthPickerVisible,
      onHeaderSelect,
      getStyles,
      theme,
      className } = this.props;
    let dayPickerId = getId('DatePickerDay-dayPicker');
    let monthAndYearId = getId('DatePickerDay-monthAndYear');
    let leftNavigationIcon = navigationIcons.leftNavigation;
    let rightNavigationIcon = navigationIcons.rightNavigation;
    let weekNumbers = showWeekNumbers ? getWeekNumbersInMonth(weeks!.length, firstDayOfWeek, firstWeekOfYear, navigatedDate) : null;
    let selectedDateWeekNumber = showWeekNumbers ? getWeekNumber(selectedDate, firstDayOfWeek, firstWeekOfYear) : undefined;

    // determine if previous/next months are in bounds
    const prevMonthInBounds = minDate ? compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true;
    const nextMonthInBounds = maxDate ? compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true;

    const classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        className: className,
        calendarsInline: monthPickerVisible!,
        showWeekNumbers: showWeekNumbers!,
        isPrevMonthDisabled: !prevMonthInBounds,
        isNextMonthDisabled: !nextMonthInBounds,
        isHeaderSelectable: !!onHeaderSelect
      });

    // When the month is highlighted get the corner dates so that styles can be added to them
    let weekCorners: IWeekCorners = {};
    if (dateRangeType === DateRangeType.Month && selectedDate.getMonth() === navigatedDate.getMonth() && selectedDate.getFullYear() === navigatedDate.getFullYear()) {
      // navigatedDate is on the current month and current year
      weekCorners = this._getWeekCornerStyles(weeks!, classNames);
    }

    return (
      <div className={ classNames.root } id={ dayPickerId }>
        <div className={ classNames.navigators }>
          <div className='ms-DatePicker-navContainer'>
            <span
              className={ classNames.prevNavigator }
              onClick={ this._onSelectPrevMonth }
              onKeyDown={ this._onPrevMonthKeyDown }
              aria-controls={ dayPickerId }
              aria-label={ strings.prevMonthAriaLabel ? strings.prevMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, -1).getMonth()] : undefined }
              role='button'
              tabIndex={ 0 }
            >
              <Icon iconName={ getRTL() ? rightNavigationIcon : leftNavigationIcon } />
            </span >
            <span
              className={ classNames.nextNavigator }
              onClick={ this._onSelectNextMonth }
              onKeyDown={ this._onNextMonthKeyDown }
              aria-controls={ dayPickerId }
              aria-label={ strings.nextMonthAriaLabel ? strings.nextMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, 1).getMonth()] : undefined }
              role='button'
              tabIndex={ 0 }
            >
              <Icon iconName={ getRTL() ? leftNavigationIcon : rightNavigationIcon } />
            </span >
          </div >
        </div >
        <div className={ classNames.header } >
          <div aria-live='polite' aria-relevant='text' aria-atomic='true' id={ monthAndYearId }>
            { this.props.onHeaderSelect ?
              <div
                className={ classNames.headerLabel }
                onClick={ this._onHeaderSelect }
                onKeyDown={ this._onHeaderKeyDown }
                aria-label={ dateTimeFormatter.formatMonthYear(navigatedDate, strings) }
                role='button'
                tabIndex={ 0 }
              >
                { dateTimeFormatter.formatMonthYear(navigatedDate, strings) }
              </div>
              :
              <div className={ classNames.headerLabel }>
                { dateTimeFormatter.formatMonthYear(navigatedDate, strings) }
              </div>
            }
          </div>
        </div>
        <FocusZone>
          {
            showWeekNumbers ?
              <table className={ mergeStyles(classNames.weekNumbersTable, classNames.table) }>
                <tbody>
                  { weekNumbers!.map((weekNumber, index) =>
                    <tr key={ index }>
                      <td>
                        <div className={ selectedDateWeekNumber === weekNumber ? mergeStyles(classNames.day, classNames.weekNumberSelected) : classNames.day }>
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
            className={ classNames.table }
            aria-readonly='true'
            aria-multiselectable='false'
            aria-labelledby={ monthAndYearId }
            aria-activedescendant={ activeDescendantId }
          >
            <thead>
              <tr>
                { strings.shortDays.map((val, index) =>
                  <th
                    className={ classNames.weekday }
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

                    const backgroundStyle = mergeStyles(
                      (dateRangeType === DateRangeType.Week) && classNames.weekBackground,
                      (dateRangeType === DateRangeType.Month) && day.isInMonth && mergeStyles(classNames.monthBackground, this._getHighlightedCornerStyle(weekCorners, dayIndex, weekIndex)),
                      (dateRangeType === DateRangeType.Day) && classNames.dayBackground
                    );

                    const dayStyle = mergeStyles(
                      classNames.day,
                      !day.isInBounds && classNames.dayDisabled,
                      day.isInBounds && day.isInMonth && classNames.dayFocused,
                      day.isInBounds && !day.isInMonth && classNames.dayUnfocused,
                      day.isSelected && (dateRangeType === DateRangeType.Day) && classNames.daySelected,
                      day.isToday && classNames.dayToday,
                    );

                    return <td key={ day.key } className={ day.isSelected ? backgroundStyle : undefined }>
                      <div
                        className={ dayStyle }
                        role={ 'gridcell' }
                        onClick={ day.isInBounds ? day.onSelected : undefined }
                        onKeyDown={ this._onDayKeyDown(day.originalDate, weekIndex, dayIndex) }
                        aria-label={ dateTimeFormatter.formatMonthDayYear(day.originalDate, strings) }
                        id={ isNavigatedDate ? activeDescendantId : undefined }
                        aria-selected={ day.isInBounds ? day.isSelected : undefined }
                        data-is-focusable={ day.isInBounds ? true : undefined }
                        ref={ isNavigatedDate ? this._resolveRef('_navigatedDay') : undefined }
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
    if (this._navigatedDay) {
      this._navigatedDay.tabIndex = 0;
      this._navigatedDay.focus();
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
          weekCornersStyled[(weekIndex - 1) + '_' + lastDayIndex] = rightCornerStyle;
        }
      }
    }
  }

  private _getWeekCornerStyles(weeks: IDayInfo[][], classNames: IClassNames<ICalendarDayStyles>) {

    let weekCornersStyled: any = {};
    let numberOfWeeks = weeks.length;
    let indexesFirstWeek = this._findCornerIndexes(weeks[0]);
    let indexesLastWeek = this._findCornerIndexes(weeks[numberOfWeeks - 1]);

    this._populateCornerStyles(
      weekCornersStyled,
      0 /* week index */,
      indexesFirstWeek,
      classNames.daySingleTop,
      classNames.dayCornerTopLeft,
      classNames.dayCornerTopRight
    );

    this._populateCornerStyles(
      weekCornersStyled,
      weeks.length - 1 /* week index */,
      indexesLastWeek,
      classNames.daySingleBottom,
      classNames.dayCornerBottomLeft,
      classNames.dayCornerBottomRight
    );

    return weekCornersStyled;
  }

  private _getHighlightedCornerStyle(weekCorners: IWeekCorners, dayIndex: number, weekIndex: number) {
    let cornerStyle = weekCorners[weekIndex + '_' + dayIndex] ? weekCorners[weekIndex + '_' + dayIndex] : '';

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

  @autobind
  private _onKeyDown(callback: () => void, ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      callback();
    }
  }

  @autobind
  private _onDayKeyDown(originalDate: Date, weekIndex: number, dayIndex: number)
    : (ev: React.KeyboardEvent<HTMLElement>) => void {
    return (ev: React.KeyboardEvent<HTMLElement>): void => {
      this._navigateMonthEdge(ev, originalDate, weekIndex, dayIndex);
    };
  }

  @autobind
  private _onSelectDate(selectedDate: Date) {
    let { onSelectDate, dateRangeType, firstDayOfWeek, navigatedDate, autoNavigateOnSelection, minDate, maxDate } = this.props;

    let dateRange = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek);
    if (dateRangeType !== DateRangeType.Day) {
      dateRange = this._getBoundedDateRange(dateRange, minDate, maxDate);
    }

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
    let { navigatedDate, selectedDate, dateRangeType, firstDayOfWeek, today, minDate, maxDate, showSixWeeksByDefault } = propsToUse;
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
    if (dateRangeType !== DateRangeType.Day) {
      selectedDates = this._getBoundedDateRange(selectedDates, minDate, maxDate);
    }

    let shouldGetWeeks = true;

    for (let weekIndex = 0; shouldGetWeeks; weekIndex++) {
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