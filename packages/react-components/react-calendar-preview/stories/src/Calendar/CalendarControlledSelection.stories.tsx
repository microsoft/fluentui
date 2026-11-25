import * as React from 'react';
import { Button, makeStyles, tokens } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { ArrowLeftRegular, ArrowRightRegular, DismissRegular } from '@fluentui/react-icons';
import { addMonths, Calendar } from '@fluentui/react-calendar-preview';

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
