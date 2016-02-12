import * as React from 'react';

interface IDayInfo {
  key: string,
  date: string,
  originalDate: Date,
  isInMonth: boolean,
  isToday: boolean,
  isSelected: boolean
}

function getWeeks(selectedDate: Date): IDayInfo[][] {
  var date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  var today = new Date();
  var weeks = [];
  var week;

  // Cycle the date backwards to get to Sunday (the first day of the week.)
  while (date.getDay() > 0) {
    date.setDate(date.getDate() - 1);
  }

  for (var weekIndex = 0; weekIndex < 6; weekIndex++) {
    week = [];

    // a flag to indicate whether all days of the week are in the month
    var isAllDaysOfWeekOutOfMonth = true;

    for (var dayIndex = 0; dayIndex < 7; dayIndex++) {
      var dayInfo = {
        key: date.toString(),
        date: date.getDate(),
        originalDate: new Date(date.toString()),
        isInMonth: date.getMonth() === selectedDate.getMonth(),
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

function compareDates(date1: Date, date2: Date) {
  return (date1.getFullYear() == date2.getFullYear()
    && date1.getMonth() == date2.getMonth()
    && date1.getDate() == date2.getDate());
}

export interface IDatePickerDayProps {
  strings: any;
  selectedDate: Date;
  onSelectNextMonth: () => void;
  onSelectPrevMonth: () => void;
  onSelectDate: (date: Date) => void;
}

export default class DatePickerDay extends React.Component<IDatePickerDayProps, any> {
  render() {
    let weeks = getWeeks(this.props.selectedDate);

    return (
      <div className="ms-DatePicker-dayPicker">
                <div className="ms-DatePicker-header">
                    <div className="ms-DatePicker-month">{this.props.strings.months[this.props.selectedDate.getMonth()]}</div>
                    <div className="ms-DatePicker-year">{this.props.selectedDate.getFullYear() }</div>
                  </div>
                <div className="ms-DatePicker-monthComponents">
                    <span className="ms-DatePicker-nextMonth js-nextMonth" onClick={() => this.props.onSelectNextMonth() }><i className="ms-Icon ms-Icon--chevronRight"></i></span>
                    <span className="ms-DatePicker-prevMonth js-prevMonth" onClick={() => this.props.onSelectPrevMonth() }><i className="ms-Icon ms-Icon--chevronLeft"></i></span>
                    <div className="ms-DatePicker-headerToggleView js-showMonthPicker"></div>
                  </div>
                <table className="ms-DatePicker-table" id="P141847190_table" role="grid" aria-components="P141847190"
                  aria-readonly="true">
                    <thead>
                        <tr>
                            {this.props.strings.days.map((day) => <th className="ms-DatePicker-weekday" scope="col">{day}</th>) }
                          </tr>
                      </thead>
                    <tbody>
                        {weeks.map((week, index) =>
                          <tr key={index}>
                                {week.map(day =>
                                  <td role="presentation" key={day.key}>
                                        <div className={
                                          "ms-DatePicker-day" +
                                          (day.isInMonth ? " ms-DatePicker-day--infocus" : " ms-DatePicker-day--outfocus") +
                                          (day.isToday ? " ms-DatePicker-day--today" : "") +
                                          (day.isSelected ? " ms-DatePicker-day--highlighted" : "")
                                        } role="gridcell" onClick={() => this.props.onSelectDate(day.originalDate) }>{day.date}</div>
                                    </td>
                                ) }
                            </tr>
                        ) }
                      </tbody>
                  </table>
        </div>
    );
  }
}