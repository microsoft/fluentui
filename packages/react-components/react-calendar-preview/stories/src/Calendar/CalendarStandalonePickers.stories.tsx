import * as React from 'react';
import { makeStyles, Text, tokens, useAnimationFrame } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import {
  addYears,
  CalendarDay,
  CalendarMonth,
  CalendarProvider,
  CalendarYear,
  calendarContextDefaultValue,
} from '@fluentui/react-calendar-preview';
import type { CalendarDayHandle, CalendarProps } from '@fluentui/react-calendar-preview';

const useStyles = makeStyles({
  pickers: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalXL },
});

export const CalendarStandalonePickers = (): JSXElement => {
  const styles = useStyles();
  const [requestAnimationFrame] = useAnimationFrame();
  const [today] = React.useState(() => new Date());
  const [value, setValue] = React.useState<Date | null>(null);
  const [displayedDate, setDisplayedDate] = React.useState(today);
  const dayPickerRef = React.useRef<CalendarDayHandle>(null);
  const focusDayOnUpdate = React.useRef(false);
  const onSelectDate: NonNullable<CalendarProps['onSelectDate']> = (_event, data) => setValue(data.date);

  React.useEffect(() => {
    if (focusDayOnUpdate.current) {
      requestAnimationFrame(() => dayPickerRef.current?.focus());
      focusDayOnUpdate.current = false;
    }
  });

  return (
    <CalendarProvider
      value={{
        ...calendarContextDefaultValue,
        value,
        setValue: onSelectDate,
        today,
        firstDayOfWeek: 'monday',
        highlightCurrent: true,
        highlightSelected: true,
        minDate: new Date(today.getFullYear() - 2, 0, 1),
        maxDate: new Date(today.getFullYear() + 2, 11, 31),
      }}
    >
      <div>Selected date: {value?.toDateString() ?? 'Not set'}</div>
      <div className={styles.pickers}>
        <section aria-label="Standalone day picker">
          <Text as="h3" weight="semibold">
            Day
          </Text>
          <CalendarDay
            ref={dayPickerRef}
            navigatedDate={displayedDate}
            onNavigateDate={(_event, data) => {
              focusDayOnUpdate.current = data.focusOnNavigatedDay;
              setDisplayedDate(data.date);
            }}
          />
        </section>
        <section aria-label="Standalone month picker">
          <Text as="h3" weight="semibold">
            Month
          </Text>
          <CalendarMonth
            navigatedDate={displayedDate}
            onNavigateDate={(_event, data) => setDisplayedDate(data.date)}
            onSelectDate={onSelectDate}
          />
        </section>
        <section aria-label="Standalone year picker">
          <Text as="h3" weight="semibold">
            Year
          </Text>
          <CalendarYear
            navigatedYear={displayedDate.getFullYear()}
            onSelectYear={(_event, data) => {
              const date = addYears(displayedDate, data.year - displayedDate.getFullYear());
              setValue(date);
              setDisplayedDate(date);
            }}
          />
        </section>
      </div>
    </CalendarProvider>
  );
};

CalendarStandalonePickers.parameters = {
  docs: {
    description: {
      story:
        'CalendarProvider supplies selection, boundaries, range settings, and formatters to independent pickers. ' +
        'Start from calendarContextDefaultValue, handle day selection through setValue, and handle month/year selection through their callbacks. ' +
        'Each picker reports navigation separately from selection. Restore day focus after navigation when focusOnNavigatedDay is requested.',
    },
  },
};
