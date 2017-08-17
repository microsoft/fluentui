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
    let weekCorners: any = false;
    if (dateRangeType == 2) {
      console.log(selectedDate.getMonth(), selectedDate, navigatedDate.getMonth(), navigatedDate)
      weekCorners = selectedDate.getMonth() == navigatedDate.getMonth() ? this.findWeekCorners(weeks) : this.findUnFocusedWeekCorners(weeks);
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
            <div className={ css('ms-DatePicker-month', styles.month) }>{ strings.months[navigatedDate.getMonth()] }</div>
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
                        ['ms-DatePicker-weekHighlighted ' + styles.weekHighlighted]: day.isSelected && dateRangeType == 1,
                        ['ms-DatePicker-monthHighlighted ' + this.checkHighlightCorner(weekCorners, dayIndex, weekIndex)]: day.isSelected && dateRangeType == 2
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
                            ['ms-DatePicker-day--highlighted ' + styles.dayIsHighlighted]: day.isSelected
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
    let weekCorners: any[] = [];
    let firstWeek: any[] = [];
    let lastWeek: any[] = [];
    let daysInWeek = weeks[0].length;
    let numberOfWeeks = weeks.length;

    weeks[0].map((day: any, index: number) => {
      if (day.isInMonth) { firstWeek.push(index) }
    });

    weeks[numberOfWeeks - 1].map((day: any, index: number) => {
      if (day.isInMonth) { lastWeek.push(index) }
    });

    if (firstWeek.length == 1) {
      weekCorners.push({
        index: daysInWeek - 1,
        styles: styles.monthHighlightedTop,
        week: 0
      })
    }
    else {
      weekCorners.push({
        index: firstWeek[0],
        styles: styles.monthHighlightedTopLeft,
        week: 0
      },
        {
          index: daysInWeek - 1,
          styles: styles.monthHighlightedTopRight,
          week: 0
        });
    }

    if (daysInWeek != firstWeek.length) {
      weekCorners.push({
        index: 0,
        styles: styles.monthHighlightedTopLeft,
        week: 1
      });
    }

    if (lastWeek.length == 1) {
      weekCorners.push({
        index: 0,
        styles: styles.monthHighlightedBottom,
        week: numberOfWeeks - 1
      })
    }
    else {
      weekCorners.push({
        index: 0,
        styles: styles.monthHighlightedBottomLeft,
        week: numberOfWeeks - 1
      },
        {
          index: lastWeek[lastWeek.length - 1],
          styles: styles.monthHighlightedBottomRight,
          week: numberOfWeeks - 1
        });
    }

    if (daysInWeek != lastWeek.length) {
      weekCorners.push({
        index: daysInWeek - 1,
        styles: styles.monthHighlightedBottomRight,
        week: numberOfWeeks - 2
      });
    }
    return weekCorners

  }

  private findUnFocusedWeekCorners(weeks: any) {
    console.log('unfocused corners!!!')
    let weekCorners: any[] = [];
    let firstWeek: any[] = [];
    let lastWeek: any[] = [];
    let daysInWeek = weeks[0].length;
    let numberOfWeeks = weeks.length;

    weeks[0].map((day: any, index: number) => {
      if (!day.isInMonth) { firstWeek.push(index) }
    });

    weeks[numberOfWeeks - 1].map((day: any, index: number) => {
      if (!day.isInMonth) { lastWeek.push(index) }
    });

    if (firstWeek.length == 1) {
      weekCorners.push({
        index: 0,
        styles: styles.monthHighlightedFull,
        week: 0
      })
    }
    else {
      weekCorners.push({
        index: 0,
        styles: styles.monthHighlightedLeft,
        week: 0
      },
        {
          index: firstWeek[firstWeek.length - 1],
          styles: styles.monthHighlightedRight,
          week: 0
        });
    }

    if (lastWeek.length == 1) {
      weekCorners.push({
        index: lastWeek[lastWeek.length - 1],
        styles: styles.monthHighlightedFull,
        week: numberOfWeeks - 1
      })
    }
    else {
      weekCorners.push({
        index: lastWeek[0],
        styles: styles.monthHighlightedLeft,
        week: numberOfWeeks - 1
      },
        {
          index: lastWeek[lastWeek.length - 1],
          styles: styles.monthHighlightedRight,
          week: numberOfWeeks - 1
        });
    }
    return weekCorners

  }


  private checkHighlightCorner(weekCorners: any, dayIndex: number, weekIndex: number) {
    let cornerStyle = styles.monthHighlighted
    if (weekCorners) {
      weekCorners.forEach((corner: any) => {
        if (corner.index == dayIndex && corner.week == weekIndex) {
          cornerStyle = corner.styles;
        }
      });
    }

    return cornerStyle
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
