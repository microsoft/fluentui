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
import { ICalendarStrings, ICalendarIconStrings } from './Calendar.Props';
import { DayOfWeek, DateRangeType } from '../../utilities/dateValues/DateValues';
import { FocusZone } from '../../FocusZone';
import { Icon } from '../../Icon';
import {
  addDays,
  addWeeks,
  addMonths,
  compareDates,
  compareDatePart,
  getDateRangeArray,
  isInDateRangeArray
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
}

export interface ICalendarDayState {
  activeDescendantId?: string;
  weeks?: IDayInfo[][];
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
    const { navigatedDate, selectedDate, today } = nextProps;

    this.setState({
      weeks: this._getWeeks(nextProps)
    });
  }

  public render() {
    let { activeDescendantId, weeks } = this.state;
    let { firstDayOfWeek, strings, navigatedDate, navigationIcons, dateRangeType, selectedDate } = this.props;
    let dayPickerId = getId('DatePickerDay-dayPicker');
    let monthAndYearId = getId('DatePickerDay-monthAndYear');
    let leftNavigationIcon = navigationIcons.leftNavigation;
    let rightNavigationIcon = navigationIcons.rightNavigation;

    // When the month is highlighted get the corner dates so that styles can be added to them
    let weekCorners: any[] = [];
    if (dateRangeType === 2) {
      if (selectedDate.getMonth() === navigatedDate.getMonth() && selectedDate.getFullYear() === navigatedDate.getFullYear()) {
        // navigatedDate is on the current month and current year
        weekCorners = this.findWeekCorners(weeks);
      }
    }

    return (
      <div className={ css('ms-DatePicker-dayPicker', styles.dayPicker) } id={ dayPickerId }>
        <div className={ css('ms-DatePicker-monthComponents', styles.monthComponents) }>
          <div className={ css('ms-DatePicker-navContainer', styles.navContainer) }>
            <span
              className={ css('ms-DatePicker-prevMonth js-prevMonth', styles.prevMonth) }
              onClick={ this._onSelectPrevMonth }
              onKeyDown={ this._onPrevMonthKeyDown }
              aria-controls={ dayPickerId }
              aria-label={ strings.prevMonthAriaLabel }
              role='button'
              tabIndex={ 0 }>
              <Icon iconName={ getRTL() ? rightNavigationIcon : leftNavigationIcon } />
            </span >
            <span
              className={ css('ms-DatePicker-nextMonth js-nextMonth', styles.nextMonth) }
              onClick={ this._onSelectNextMonth }
              onKeyDown={ this.onNextMonthKeyDown }
              aria-controls={ dayPickerId }
              aria-label={ strings.nextMonthAriaLabel }
              role='button'
              tabIndex={ 0 }>
              <Icon iconName={ getRTL() ? leftNavigationIcon : rightNavigationIcon } />
            </span >
          </div >
        </div >
        <div className={ css('ms-DatePicker-header', styles.header) }>
          <div aria-live='polite' aria-relevant='text' aria-atomic='true' id={ monthAndYearId }>
            <div className={ css('ms-DatePicker-month', styles.month) }>{ strings.shortMonths[navigatedDate.getMonth()] }</div>
            <div className={ css('ms-DatePicker-year', styles.year) }>{ navigatedDate.getFullYear() }</div>
          </div>
          {
            this.props.onHeaderSelect ?
              <div
                className={ css('ms-DatePicker-headerToggleView js-showMonthPicker', styles.headerToggleView) }
                onClick={ this._onHeaderSelect }
                onKeyDown={ this._onHeaderKeyDown }
                aria-label={ strings.monthPickerAriaLabel }
                role='button'
                tabIndex={ 0 }
              />
              :
              null
          }
        </div>
        <FocusZone>
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
                    scope='col'
                    key={ index }
                    title={ strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK] }
                    aria-label={ strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK] }>
                    { strings.shortDays[(index + firstDayOfWeek) % DAYS_IN_WEEK] }
                  </th>) }
              </tr>
            </thead>
            <tbody>
              { weeks!.map((week, weekIndex) =>
                <tr key={ weekIndex } >
                  { week.map((day, dayIndex) =>
                    <td key={ day.key } className={ css(
                      {
                        ['ms-DatePicker-weekBackground ' + styles.weekBackground]: day.isSelected && dateRangeType === 1,
                        ['ms-DatePicker-monthBackground ' + styles.monthBackground + ' ' + this.getHighlightedCornerStyle(weekCorners, dayIndex, weekIndex)]: day.isInMonth && day.isSelected && dateRangeType === 2,
                        ['ms-DatePicker-day--dayBackground ' + styles.dayBackground]: day.isSelected && dateRangeType === 0
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
                            ['ms-DatePicker-day--highlighted ' + styles.dayIsHighlighted]: day.isSelected && dateRangeType === 0
                          }) }
                        role='button'
                        onClick={ day.onSelected }
                        onKeyDown={ (ev: React.KeyboardEvent<HTMLElement>) =>
                          this._navigateMonthEdge(ev, day.originalDate, weekIndex, dayIndex) }
                        aria-selected={ day.isSelected }
                        aria-label={ day.originalDate.toLocaleString ?
                          day.originalDate.toLocaleString([], { day: 'numeric', month: 'long', year: 'numeric' }) : day.originalDate.getDate() }
                        id={ compareDates(navigatedDate, day.originalDate) ? activeDescendantId : undefined }
                        data-is-focusable={ true }
                        ref={ compareDates(navigatedDate, day.originalDate) ? 'navigatedDay' : undefined }
                        key={ compareDates(navigatedDate, day.originalDate) ? 'navigatedDay' : undefined } >
                        <span aria-hidden='true'>{ day.date }</span>
                      </div>
                    </td>
                  ) }
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

  private findWeekCorners(weeks: any) {
    let weekCorners: any = {};
    let numberOfWeeks = weeks.length;
    let { firstDayOfWeek, navigatedDate, dateRangeType } = this.props;

    // Get all days in current month
    let dateRange = getDateRangeArray(navigatedDate, dateRangeType, firstDayOfWeek);

    //Check to see if second to the last day (of the first week) is within the current month
    if (weeks[0][DAYS_IN_WEEK - 2].originalDate.getMonth() !== navigatedDate.getMonth()) {
      //There is only one highlighted day in first week, add styles to this square
      let weekIndex = 0;
      let dayIndex = DAYS_IN_WEEK - 1;
      weekCorners[weekIndex + '_' + dayIndex] = 'ms-DatePicker-singleTopDate ' + styles.singleTopDate;
    }
    else {
      //Add styles to first and last highlighted squares in the first week
      let weekIndex = 0;
      let dayIndex = dateRange[0].getDay();
      weekCorners[weekIndex + '_' + dayIndex] = 'ms-DatePicker-topLeftCornerDate ' + styles.topLeftCornerDate;

      let weekIndex2 = 0;
      let dayIndex2 = DAYS_IN_WEEK - 1;
      weekCorners[weekIndex2 + '_' + dayIndex2] = 'ms-DatePicker-topRightCornerDate ' + styles.topRightCornerDate;
    }

    //check the first week to see if the first day of the week is NOT within the current month
    if (weeks[0][0].originalDate.getMonth() !== navigatedDate.getMonth()) {
      //The first day of week 2 is a corner
      let weekIndex = 1;
      let dayIndex = 0;
      weekCorners[weekIndex + '_' + dayIndex] = 'ms-DatePicker-topLeftCornerDate ' + styles.topLeftCornerDate;
    }

    //Check to see if second day (of the last week) is within the current month
    if (weeks[numberOfWeeks - 1][1].originalDate.getMonth() !== navigatedDate.getMonth()) {
      //There is only one highlighted day in the last week, add styles to this square
      let weekIndex = numberOfWeeks - 1;
      let dayIndex = 0;
      weekCorners[weekIndex + '_' + dayIndex] = 'ms-DatePicker-singleBottomDate ' + styles.singleBottomDate;
    }
    else {
      //Add styles to first and last highlighted squares in the last week
      let weekIndex = numberOfWeeks - 1;
      let dayIndex = 0;
      weekCorners[weekIndex + '_' + dayIndex] = 'ms-DatePicker-bottomLeftCornerDate ' + styles.bottomLeftCornerDate;

      let weekIndex2 = numberOfWeeks - 1;
      let dayIndex2 = dateRange[dateRange.length - 1].getDay();
      weekCorners[weekIndex2 + '_' + dayIndex2] = 'ms-DatePicker-bottomRightCornerDate ' + styles.bottomRightCornerDate;

    }

    //check the last week to see if the last day of this week is NOT within the current month
    if (weeks[numberOfWeeks - 1][DAYS_IN_WEEK - 1].originalDate.getMonth() !== navigatedDate.getMonth()) {
      //If the last week is not all within the current month, the last day of the second to last week is a corner
      let weekIndex = numberOfWeeks - 2;
      let dayIndex = DAYS_IN_WEEK - 1;
      weekCorners[weekIndex + '_' + dayIndex] = 'ms-DatePicker-bottomRightCornerDate ' + styles.bottomRightCornerDate;
    }

    return weekCorners;
  }

  private getHighlightedCornerStyle(weekCorners: any, dayIndex: number, weekIndex: number) {
    let cornerStyle = weekCorners[weekIndex + '_' + dayIndex] ? weekCorners[weekIndex + '_' + dayIndex] : ''

    return cornerStyle;
  }

  private _navigateMonthEdge(ev: React.KeyboardEvent<HTMLElement>, date: Date, weekIndex: number, dayIndex: number) {
    if (weekIndex === 0 && ev.which === KeyCodes.up) {
      this.props.onNavigateDate(addWeeks(date, -1), true);
      ev.preventDefault();
    } else if (weekIndex === (this.state.weeks!.length - 1) && ev.which === KeyCodes.down) {
      this.props.onNavigateDate(addWeeks(date, 1), true);
      ev.preventDefault();
    } else if (dayIndex === 0 && ev.which === getRTLSafeKeyCode(KeyCodes.left)) {
      this.props.onNavigateDate(addDays(date, -1), true);
      ev.preventDefault();
    } else if (dayIndex === (DAYS_IN_WEEK - 1) && ev.which === getRTLSafeKeyCode(KeyCodes.right)) {
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
  private _onSelectDate(selectedDate: Date) {
    let { onSelectDate, dateRangeType, firstDayOfWeek, navigatedDate, autoNavigateOnSelection } = this.props;

    let dateRange = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek);
    if (onSelectDate != null) {
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
  private onNextMonthKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
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
}
