import * as React from 'react';
import { Button, makeStyles, Radio, RadioGroup, tokens } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { ArrowLeftRegular, ArrowRightRegular } from '@fluentui/react-icons';
import { addMonths, Calendar } from '@fluentui/react-calendar-preview';
import type { CalendarView } from '@fluentui/react-calendar-preview';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM },
  actions: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalS },
});

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
