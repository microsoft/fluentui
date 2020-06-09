import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { Calendar, DayOfWeek } from 'office-ui-fabric-react/lib/Calendar';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { useBoolean } from '@uifabric/react-hooks';

const DayPickerStrings = {
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

export interface ICalendarButtonExampleProps {
  isDayPickerVisible?: boolean;
  isMonthPickerVisible?: boolean;
  highlightCurrentMonth?: boolean;
  highlightSelectedMonth?: boolean;
  buttonString?: string;
  showMonthPickerAsOverlay?: boolean;
  showGoToToday?: boolean;
}

let calendarButtonElement: HTMLElement;

export const CalendarButtonExample: React.FunctionComponent<ICalendarButtonExampleProps> = (
  props: ICalendarButtonExampleProps,
) => {
  const [showCalendar, { toggle: toggleShowCalendar }] = useBoolean(false);
  const [selectedDate, setSelectedDate] = React.useState();

  const {
    showMonthPickerAsOverlay = false,
    isDayPickerVisible = true,
    isMonthPickerVisible = true,
    showGoToToday = true,
    buttonString = 'Click for Calendar',
    highlightCurrentMonth,
    highlightSelectedMonth,
  } = props;
  const onSelectDate = (date: Date): void => {
    toggleShowCalendar();
    setSelectedDate(date);
  };

  return (
    <div>
      <div ref={calendarBtn => (calendarButtonElement = calendarBtn!)}>
        <DefaultButton
          onClick={toggleShowCalendar}
          text={!selectedDate ? buttonString : selectedDate.toLocaleDateString()}
        />
      </div>
      {showCalendar && (
        <Callout
          isBeakVisible={false}
          className="ms-DatePicker-callout"
          gapSpace={0}
          doNotLayer={false}
          target={calendarButtonElement}
          directionalHint={DirectionalHint.bottomLeftEdge}
          onDismiss={toggleShowCalendar}
          setInitialFocus
        >
          <FocusTrapZone firstFocusableSelector="ms-DatePicker-day--today" isClickableOutsideFocusTrap>
            <Calendar
              onSelectDate={onSelectDate}
              onDismiss={toggleShowCalendar}
              isMonthPickerVisible={isMonthPickerVisible}
              value={selectedDate!}
              firstDayOfWeek={DayOfWeek.Sunday}
              strings={DayPickerStrings}
              isDayPickerVisible={isDayPickerVisible}
              highlightCurrentMonth={highlightCurrentMonth}
              highlightSelectedMonth={highlightSelectedMonth}
              showMonthPickerAsOverlay={showMonthPickerAsOverlay}
              showGoToToday={showGoToToday}
            />
          </FocusTrapZone>
        </Callout>
      )}
    </div>
  );
};
