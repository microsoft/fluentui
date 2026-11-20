import * as React from 'react';
import { Calendar } from '@fluentui/react-headless-components-preview/calendar';
import { calendarAppearance } from './calendarAppearance';
import styles from './calendar.module.css';

export const MarkedDays = (): React.ReactNode => (
  <div className={styles.story}>
    <p>October 8, 14 and 22 have appointments. Marking a date does not restrict selection.</p>
    <Calendar
      {...calendarAppearance}
      today={new Date(2025, 9, 14)}
      defaultValue={new Date(2025, 9, 14)}
      monthPicker={null}
      getMarkedDays={() => [new Date(2025, 9, 8), new Date(2025, 9, 14), new Date(2025, 9, 22)]}
      renderCell={(props, cell, defaultRender) =>
        defaultRender(
          cell.type === 'day' && cell.isMarked ? { ...props, root: { ...props.root, title: 'Appointment' } } : props,
        )
      }
    />
  </div>
);

MarkedDays.parameters = {
  docs: {
    description: {
      story:
        'Style data-marked and the marker element with consumer CSS. renderCell receives the built-in cell props and can pass changed props to the default renderer, which keeps Calendar keyboard and selection behavior.',
    },
  },
};
