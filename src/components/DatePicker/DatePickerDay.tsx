import * as React from 'react';
import { css } from '../../utilities/css';
import { DayOfWeek, IDatePickerStrings } from './DatePicker.Props';

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

    return (
      <div className='ms-DatePicker-dayPicker'>
        <div className='ms-DatePicker-header'>
          <div className='ms-DatePicker-month'>{strings.months[selectedDate.getMonth()]}</div>
          <div className='ms-DatePicker-year'>{selectedDate.getFullYear() }</div>
        </div>
        <div className='ms-DatePicker-monthComponents'>
          <span className='ms-DatePicker-nextMonth js-nextMonth' onClick={ onSelectNextMonth }><i className='ms-Icon ms-Icon--chevronRight'></i></span>
          <span className='ms-DatePicker-prevMonth js-prevMonth' onClick={ onSelectPrevMonth }><i className='ms-Icon ms-Icon--chevronLeft'></i></span>
          <div className='ms-DatePicker-headerToggleView js-showMonthPicker'></div>
        </div>
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
                        onClick={ () => onSelectDate(day.originalDate) }
                        aria-selected={ day.isSelected }
                        id={ day.isSelected ? activeDescendantId : null } >
                          {day.date}
                    </div>
                  </td>
                ) }
              </tr>
            ) }
          </tbody>
        </table>
      </div>
    );
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
          isToday: this.compareDates(today, date),
          isSelected: this.compareDates(selectedDate, date)
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

  private compareDates(date1: Date, date2: Date) {
    return (date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate());
  }
}
