import * as React from 'react';
import { Button, makeStyles, Radio, RadioGroup, tokens } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { ArrowLeftRegular, ArrowRightRegular, DismissRegular } from '@fluentui/react-icons';
import { addMonths, Calendar } from '@fluentui/react-calendar-preview';
import type { CalendarView } from '@fluentui/react-calendar-preview';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM },
  actions: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalS },
});

export const CalendarControlledSelection = (): JSXElement => {
  const styles = useStyles();
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <div className={styles.root}>
      <div>Selected date: {value?.toDateString() ?? 'Not set'}</div>
      <Calendar value={value} onSelectDate={(_event, data) => setValue(data.date)} />
      <div className={styles.actions}>
        <Button icon={<ArrowLeftRegular />} onClick={() => setValue(addMonths(value ?? new Date(), -1))}>
          Previous
        </Button>
        <Button icon={<ArrowRightRegular />} onClick={() => setValue(addMonths(value ?? new Date(), 1))}>
          Next
        </Button>
        <Button icon={<DismissRegular />} onClick={() => setValue(null)}>
          Clear selection
        </Button>
      </div>
    </div>
  );
};

CalendarControlledSelection.parameters = {
  docs: {
    description: {
      story:
        'Use null for an empty controlled selection. External value changes navigate to the new date unless displayedDate is also controlled. Clearing selection preserves the displayed month.',
    },
  },
};

export const CalendarControlledNavigation = (): JSXElement => {
  const styles = useStyles();
  const [value, setValue] = React.useState<Date | null>(null);
  const [displayedDate, setDisplayedDate] = React.useState(() => new Date());
  const [view, setView] = React.useState<CalendarView>('day');

  return (
    <div className={styles.root}>
      <div>Selected date: {value?.toDateString() ?? 'Not set'}</div>
      <RadioGroup
        aria-label="Calendar view"
        layout="horizontal"
        value={view}
        onChange={(_event, data) => setView(data.value as CalendarView)}
      >
        <Radio value="day" label="Day" />
        <Radio value="month" label="Month" />
      </RadioGroup>
      <Calendar
        value={value}
        onSelectDate={(_event, data) => setValue(data.date)}
        displayedDate={displayedDate}
        onDisplayedDateChange={(_event, data) => setDisplayedDate(data.displayedDate)}
        view={view}
        onViewChange={(_event, data) => setView(data.view)}
        layout="overlay"
      />
      <div className={styles.actions}>
        <Button icon={<ArrowLeftRegular />} onClick={() => setDisplayedDate(addMonths(displayedDate, -1))}>
          Previous month
        </Button>
        <Button icon={<ArrowRightRegular />} onClick={() => setDisplayedDate(addMonths(displayedDate, 1))}>
          Next month
        </Button>
      </div>
    </div>
  );
};

CalendarControlledNavigation.parameters = {
  docs: {
    description: {
      story:
        'Control displayedDate and view independently from value. Accept navigation and view-change requests in their corresponding callbacks; navigation does not commit a selection.',
    },
  },
};

export const CalendarUncontrolledSelection = (): JSXElement => (
  <Calendar defaultValue={null} defaultDisplayedDate={new Date(2025, 0, 15)} />
);

CalendarUncontrolledSelection.parameters = {
  docs: {
    description: {
      story: 'defaultValue and defaultDisplayedDate initialize uncontrolled state without requiring change handlers.',
    },
  },
};

export const CalendarDayOnly = (): JSXElement => <Calendar monthPicker={null} defaultValue={null} />;

CalendarDayOnly.parameters = {
  docs: { description: { story: 'Set monthPicker to null for a day-only calendar with no month-view toggle.' } },
};
