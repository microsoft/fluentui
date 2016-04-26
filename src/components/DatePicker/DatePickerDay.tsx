import * as React from 'react';
import { css } from '../../utilities/css';
import { DayOfWeek, IDatePickerStrings } from './DatePicker.Props';
import { FocusZone } from '../../utilities/focus/index';
import KeyCodes from '../../utilities/KeyCodes';

const DAYS_IN_WEEK = 7;

interface IDayInfo {
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
  onSelectNextMonth: () => void;
  onSelectPrevMonth: () => void;
  onSelectDate: (date: Date) => void;
  firstDayOfWeek: DayOfWeek;
}

export interface IDatePickerDayState {
  activeDescendantId?: string;
}

let _instance = 0;

export default class DatePickerDay extends React.Component<IDatePickerDayProps, IDatePickerDayState> {
  public refs: {
    [key: string]: React.ReactInstance;
    selectedDay: HTMLElement;
  };

  public constructor() {
    super();

    this.state = {
      activeDescendantId: 'DatePickerDay-active-' + _instance
    };
  }

  public render() {
    let { activeDescendantId } = this.state;
    let { firstDayOfWeek, strings, selectedDate, onSelectNextMonth, onSelectPrevMonth, onSelectDate } = this.props;
    let weeks = this._getWeeks(selectedDate);

    let selectDayCallbacks = {};

    weeks.map((week, index) => week.map(day => selectDayCallbacks[day.key] = onSelectDate.bind(this, day.originalDate)));

    return (
      <div className='ms-DatePicker-dayPicker'>
        <div className='ms-DatePicker-header'>
          <div className='ms-DatePicker-month'>{strings.months[selectedDate.getMonth()]}</div>
          <div className='ms-DatePicker-year'>{selectedDate.getFullYear() }</div>
        </div>
        <div className='ms-DatePicker-monthComponents'>
          <div className='ms-DatePicker-navContainer'>
            <span
              className='ms-DatePicker-prevMonth js-prevMonth'
              onClick={ onSelectPrevMonth }
              onKeyDown={ this._onKeyDown.bind(this, onSelectPrevMonth) }
              tabIndex={ 0 }>
              <i className='ms-Icon ms-Icon--chevronLeft' />
            </span>
            <span
              className='ms-DatePicker-nextMonth js-nextMonth'
              onClick={ onSelectNextMonth }
              onKeyDown={ this._onKeyDown.bind(this, onSelectNextMonth) }
              tabIndex={ 0 }>
                <i className='ms-Icon ms-Icon--chevronRight' />
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
                {weeks.map((week, index) =>
                  <tr key={index}>
                    {week.map(day =>
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
                            onKeyDown={ this._onKeyDown.bind(this, selectDayCallbacks[day.key]) }
                            aria-selected={ this._isSelectedDay(selectedDate, day) }
                            id={ this._isSelectedDay(selectedDate, day) ? activeDescendantId : null }
                            data-is-focusable={ true }
                            ref={ this._isSelectedDay(selectedDate, day) ? 'selectedDay' : null }
                            key={ this._isSelectedDay(selectedDate, day) ? 'selectedDay' : null } >
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
    if (this.refs.selectedDay) {
      this.refs.selectedDay.tabIndex = 0;
      this.refs.selectedDay.focus();
    }
  }

  private _isSelectedDay(selectedDate: Date, day: IDayInfo) {
    return selectedDate ? day.isSelected : day.isToday;
  }

  private _onKeyDown(callback: () => void, ev: React.KeyboardEvent) {
    if (ev.which === KeyCodes.enter) {
      callback();
    }
  }

  private _getWeeks(selectedDate: Date): IDayInfo[][] {
    let { firstDayOfWeek } = this.props;
    let date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    let today = new Date();
    let weeks = [];
    let week;

    // Cycle the date backwards to get to Sunday (the first day of the week.)
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
          isInMonth: date.getMonth() === selectedDate.getMonth(),
          isToday: this._compareDates(today, date),
          isSelected: this._compareDates(selectedDate, date)
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

  private _compareDates(date1: Date, date2: Date) {
    return date1.getTime() === date2.getTime();
  }
}
