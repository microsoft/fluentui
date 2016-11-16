import * as React from 'react';
import { css } from '../../utilities/css';
import { DayOfWeek, IDatePickerStrings } from './DatePicker.Props';
import { FocusZone } from '../../FocusZone';
import { KeyCodes } from '../../utilities/KeyCodes';
import { addDays, addWeeks, addMonths, compareDates } from '../../utilities/dateMath/DateMath';
import { getRTL, getRTLSafeKeyCode } from '../../utilities/rtl';
import { getId } from '../../utilities/object';

const DAYS_IN_WEEK = 7;

export interface IDayInfo {
  key: string;
  date: string;
  originalDate: Date;
  isInMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

export interface IDatePickerDayProps {
  strings: IDatePickerStrings;
  selectedDate: Date;
  navigatedDate: Date;
  onSelectDate: (date: Date) => void;
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
  firstDayOfWeek: DayOfWeek;
}

export interface IDatePickerDayState {
  activeDescendantId?: string;
  weeks?: IDayInfo[][];
}

export class DatePickerDay extends React.Component<IDatePickerDayProps, IDatePickerDayState> {
  public refs: {
    [key: string]: React.ReactInstance;
    navigatedDay: HTMLElement;
  };

  public constructor(props: IDatePickerDayProps) {
    super(props);

    this.state = {
      activeDescendantId: getId('DatePickerDay-active'),
      weeks: this._getWeeks(props.navigatedDate, props.selectedDate)
    };

    this._onSelectNextMonth = this._onSelectNextMonth.bind(this);
    this._onSelectPrevMonth = this._onSelectPrevMonth.bind(this);
  }

  public componentWillReceiveProps (nextProps: IDatePickerDayProps) {
    this.setState({
      weeks: this._getWeeks(nextProps.navigatedDate, nextProps.selectedDate)
    });
  }

  public render() {
    let { activeDescendantId, weeks } = this.state;
    let { firstDayOfWeek, strings,  navigatedDate, onSelectDate } = this.props;

    let selectDayCallbacks = {};
    weeks.map((week, index) => week.map(day => selectDayCallbacks[day.key] = onSelectDate.bind(this, day.originalDate)));

    return (
      <div className='ms-DatePicker-dayPicker'>
        <div className='ms-DatePicker-header'>
          <div className='ms-DatePicker-month'>{strings.months[navigatedDate.getMonth()]}</div>
          <div className='ms-DatePicker-year'>{navigatedDate.getFullYear() }</div>
        </div>
        <div className='ms-DatePicker-monthComponents'>
          <div className='ms-DatePicker-navContainer'>
            <span
              className='ms-DatePicker-prevMonth js-prevMonth'
              onClick={ this._onSelectPrevMonth }
              onKeyDown={ this._onKeyDown.bind(this, this._onSelectPrevMonth) }
              tabIndex={ 0 }>
              <i className={ css('ms-Icon', {'ms-Icon--ChevronLeft': !getRTL(), 'ms-Icon--ChevronRight': getRTL()}) }  />
            </span>
            <span
              className='ms-DatePicker-nextMonth js-nextMonth'
              onClick={ this._onSelectNextMonth }
              onKeyDown={ this._onKeyDown.bind(this, this._onSelectNextMonth) }
              tabIndex={ 0 }>
              <i className={ css('ms-Icon', {'ms-Icon--ChevronLeft': getRTL(), 'ms-Icon--ChevronRight': !getRTL()}) }  />
            </span>
          </div>
          <div className='ms-DatePicker-headerToggleView js-showMonthPicker'></div>
        </div>
        <FocusZone>
          <table className='ms-DatePicker-table' role='grid' aria-readonly='true' aria-multiselectable='false' aria-activedescendant={ activeDescendantId }>
            <thead>
              <tr>
                { strings.shortDays.map((val, index) =>
                  <th className='ms-DatePicker-weekday' scope='col' key={ index } title={ strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK] }>
                    { strings.shortDays[(index + firstDayOfWeek) % DAYS_IN_WEEK] }
                  </th>) }
              </tr>
            </thead>
            <tbody>
                {weeks.map((week, weekIndex) =>
                  <tr key={weekIndex}>
                    {week.map((day, dayIndex) =>
                      <td role='presentation' key={day.key}>
                        <div
                          className={ css('ms-DatePicker-day', {
                            'ms-DatePicker-day--infocus': day.isInMonth,
                            'ms-DatePicker-day--outfocus': !day.isInMonth,
                            'ms-DatePicker-day--today': day.isToday,
                            'ms-DatePicker-day--highlighted': day.isSelected
                          }) }
                            role='gridcell'
                            onClick={ selectDayCallbacks[day.key] }
                            onKeyDown= { (ev: React.KeyboardEvent<HTMLElement>) =>
                              this._navigateMonthEdge(ev, day.originalDate, weekIndex, dayIndex)}
                            aria-selected={ day.isSelected }
                            id={ compareDates(navigatedDate, day.originalDate) ? activeDescendantId : null }
                            data-is-focusable={ true }
                            ref={ compareDates(navigatedDate, day.originalDate) ? 'navigatedDay' : null }
                            key={ compareDates(navigatedDate, day.originalDate) ? 'navigatedDay' : null } >
                              {day.date}
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

  private _navigateMonthEdge(ev: React.KeyboardEvent<HTMLElement>, date: Date, weekIndex: number, dayIndex: number) {
    if (weekIndex === 0 && ev.which === KeyCodes.up) {
      this.props.onNavigateDate(addWeeks(date, -1), true);
      ev.preventDefault();
    } else if (weekIndex === (this.state.weeks.length - 1) && ev.which === KeyCodes.down) {
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

  private _onKeyDown(callback: () => void, ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which === KeyCodes.enter) {
      callback();
    }
  }

  private _onSelectNextMonth() {
    this.props.onNavigateDate(addMonths(this.props.navigatedDate, 1), false);
  }

  private _onSelectPrevMonth() {
    this.props.onNavigateDate(addMonths(this.props.navigatedDate, -1), false);
  }

  private _getWeeks(navigatedDate: Date, selectedDate: Date): IDayInfo[][] {
    let { firstDayOfWeek } = this.props;
    let date = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);
    let today = new Date();
    let weeks = [];
    let week;

    // Cycle the date backwards to get to the first day of the week.
    while (date.getDay() !== firstDayOfWeek) {
      date.setDate(date.getDate() - 1);
    }

    // a flag to indicate whether all days of the week are in the month
    let isAllDaysOfWeekOutOfMonth = false;

    for (let weekIndex = 0; !isAllDaysOfWeekOutOfMonth; weekIndex++) {
      week = [];

      isAllDaysOfWeekOutOfMonth = true;

      for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
        let dayInfo = {
          key: date.toString(),
          date: date.getDate(),
          originalDate: new Date(date.toString()),
          isInMonth: date.getMonth() === navigatedDate.getMonth(),
          isToday: compareDates(today, date),
          isSelected: compareDates(selectedDate, date)
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
