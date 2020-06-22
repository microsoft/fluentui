import * as React from 'react';
import { Calendar, DayOfWeek, DateRangeType } from 'office-ui-fabric-react/lib/Calendar';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { addDays, getDateRangeArray } from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';

export interface ICalendarInlineExampleProps {
  isMonthPickerVisible?: boolean;
  dateRangeType: DateRangeType;
  autoNavigateOnSelection: boolean;
  showGoToToday: boolean;
  showNavigateButtons?: boolean;
  highlightCurrentMonth?: boolean;
  highlightSelectedMonth?: boolean;
  isDayPickerVisible?: boolean;
  showMonthPickerAsOverlay?: boolean;
  showWeekNumbers?: boolean;
  minDate?: Date;
  maxDate?: Date;
  restrictedDates?: Date[];
  showSixWeeksByDefault?: boolean;
  workWeekDays?: DayOfWeek[];
  firstDayOfWeek?: DayOfWeek;
}

const dayPickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  weekNumberFormatString: 'Week number {0}',
  prevMonthAriaLabel: 'Previous month',
  nextMonthAriaLabel: 'Next month',
  prevYearAriaLabel: 'Previous year',
  nextYearAriaLabel: 'Next year',
  prevYearRangeAriaLabel: 'Previous year range',
  nextYearRangeAriaLabel: 'Next year range',
  closeButtonAriaLabel: 'Close',
};
const divStyle: React.CSSProperties = {
  height: 'auto',
};
const buttonStyle: React.CSSProperties = {
  margin: '17px 10px 0 0',
};
let dateRangeString: string | null = null;

export const CalendarInlineExample: React.FunctionComponent<ICalendarInlineExampleProps> = (
  props: ICalendarInlineExampleProps,
) => {
  const [selectedDateRange, setSelectedDateRange] = React.useState();
  const [selectedDate, setSelectedDate] = React.useState();

  const onSelectDate = (date: Date, dateRangeArray: Date[]): void => {
    setSelectedDate(date);
    setSelectedDateRange(dateRangeArray);
  };

  const goPrevious = () => {
    const goPreviousSelectedDate = selectedDate || new Date();
    const dateRangeArray = getDateRangeArray(goPreviousSelectedDate, props.dateRangeType, DayOfWeek.Sunday);
    let subtractFrom = dateRangeArray[0];
    let daysToSubtract = dateRangeArray.length;
    if (props.dateRangeType === DateRangeType.Month) {
      subtractFrom = new Date(subtractFrom.getFullYear(), subtractFrom.getMonth(), 1);
      daysToSubtract = 1;
    }
    const newSelectedDate = addDays(subtractFrom, -daysToSubtract);
    return {
      goPreviousSelectedDate: newSelectedDate,
    };
  };

  const goNext = () => {
    const goNextSelectedDate = selectedDate || new Date();
    const dateRangeArray = getDateRangeArray(goNextSelectedDate, props.dateRangeType, DayOfWeek.Sunday);
    const newSelectedDate = addDays(dateRangeArray.pop()!, 1);

    return {
      goNextSelectedDate: newSelectedDate,
    };
  };

  const onDismiss = (): void => {
    return selectedDate;
  };

  if (selectedDateRange) {
    const rangeStart = selectedDateRange[0];
    const rangeEnd = selectedDateRange[selectedDateRange.length - 1];
    dateRangeString = rangeStart.toLocaleDateString() + '-' + rangeEnd.toLocaleDateString();
  }

  return (
    <div style={divStyle}>
      {
        <div>
          Selected date(s): <span>{!selectedDate ? 'Not set' : selectedDate.toLocaleString()}</span>
        </div>
      }
      <div>
        Selected dates:
        <span> {!dateRangeString ? 'Not set' : dateRangeString}</span>
      </div>
      {(props.minDate || props.maxDate) && (
        <div>
          Date boundary:
          <span>
            {' '}
            {props.minDate ? props.minDate.toLocaleDateString() : 'Not set'}-
            {props.maxDate ? props.maxDate.toLocaleDateString() : 'Not set'}
          </span>
        </div>
      )}
      {props.restrictedDates && (
        <div>
          Disabled date(s):
          <span>
            {' '}
            {props.restrictedDates.length > 0
              ? props.restrictedDates.map(d => d.toLocaleDateString()).join(', ')
              : 'Not set'}
          </span>
        </div>
      )}
      <Calendar
        onSelectDate={onSelectDate}
        onDismiss={onDismiss}
        isMonthPickerVisible={props.isMonthPickerVisible}
        dateRangeType={props.dateRangeType}
        autoNavigateOnSelection={props.autoNavigateOnSelection}
        showGoToToday={props.showGoToToday}
        value={selectedDate!}
        firstDayOfWeek={props.firstDayOfWeek ? props.firstDayOfWeek : DayOfWeek.Sunday}
        strings={dayPickerStrings}
        highlightCurrentMonth={props.highlightCurrentMonth}
        highlightSelectedMonth={props.highlightSelectedMonth}
        isDayPickerVisible={props.isDayPickerVisible}
        showMonthPickerAsOverlay={props.showMonthPickerAsOverlay}
        showWeekNumbers={props.showWeekNumbers}
        minDate={props.minDate}
        maxDate={props.maxDate}
        restrictedDates={props.restrictedDates}
        showSixWeeksByDefault={props.showSixWeeksByDefault}
        workWeekDays={props.workWeekDays}
      />
      {props.showNavigateButtons && (
        <div>
          <DefaultButton style={buttonStyle} onClick={goPrevious} text="Previous" />
          <DefaultButton style={buttonStyle} onClick={goNext} text="Next" />
        </div>
      )}
    </div>
  );
};
