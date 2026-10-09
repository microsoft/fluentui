import * as React from 'react';
import { Button, makeStyles, tokens } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { CalendarRegular } from '@fluentui/react-icons';
import { Calendar } from '@fluentui/react-calendar-preview';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: tokens.spacingVerticalM },
  appointment: { color: tokens.colorBrandForeground1, fontWeight: tokens.fontWeightSemibold },
});

export const CalendarCustomCells = (): JSXElement => {
  const styles = useStyles();
  const appointmentRef = React.useRef<HTMLTableCellElement>(null);

  return (
    <div className={styles.root}>
      <Calendar
        dayPicker={{
          getDayCellProps: date =>
            date.getDate() === 15
              ? {
                  ref: appointmentRef,
                  title: 'Monthly appointment',
                  dayLabel: { className: styles.appointment },
                }
              : {},
        }}
        monthPicker={{
          yearPicker: {
            renderYear: year => <span aria-label={`Fiscal year ${year}`}>{year}</span>,
          },
        }}
      />
      <Button icon={<CalendarRegular />} onClick={() => appointmentRef.current?.focus()}>
        Focus appointment
      </Button>
    </div>
  );
};

CalendarCustomCells.parameters = {
  docs: {
    description: {
      story:
        'getDayCellProps customizes each visible day, including refs and child slots, without replacing the grid. ' +
        'CalendarYear.renderYear customizes year content. Cell click and keyboard handlers run first; preventDefault cancels the built-in action.',
    },
  },
};
