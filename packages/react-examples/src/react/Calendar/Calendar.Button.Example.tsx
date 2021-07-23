import * as React from 'react';
import {
  Calendar,
  FocusTrapZone,
  Callout,
  DirectionalHint,
  defaultCalendarStrings,
  DefaultButton,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';

export const CalendarButtonExample: React.FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [showCalendar, { toggle: toggleShowCalendar, setFalse: hideCalendar }] = useBoolean(false);
  const buttonContainerRef = React.useRef<HTMLDivElement>(null);

  const onSelectDate = React.useCallback(
    (date: Date, dateRangeArray: Date[]): void => {
      setSelectedDate(date);
      hideCalendar();
    },
    [hideCalendar],
  );

  return (
    <div>
      <div ref={buttonContainerRef}>
        <DefaultButton
          onClick={toggleShowCalendar}
          text={!selectedDate ? 'Click for Calendar' : selectedDate.toLocaleDateString()}
        />
      </div>
      {showCalendar && (
        <Callout
          isBeakVisible={false}
          gapSpace={0}
          doNotLayer={false}
          target={buttonContainerRef}
          directionalHint={DirectionalHint.bottomLeftEdge}
          onDismiss={hideCalendar}
          setInitialFocus
        >
          <FocusTrapZone isClickableOutsideFocusTrap>
            <Calendar
              onSelectDate={onSelectDate}
              onDismiss={hideCalendar}
              isMonthPickerVisible
              value={selectedDate}
              highlightCurrentMonth
              isDayPickerVisible
              showGoToToday
              // Calendar uses English strings by default. For localized apps, you must override this prop.
              strings={defaultCalendarStrings}
            />
          </FocusTrapZone>
        </Callout>
      )}
    </div>
  );
};
