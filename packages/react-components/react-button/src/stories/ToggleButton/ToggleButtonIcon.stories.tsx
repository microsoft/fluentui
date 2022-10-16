import * as React from 'react';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { makeStyles, ToggleButton, Tooltip } from '@fluentui/react-components';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
  },
});

export const Icon = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <ToggleButton icon={<CalendarMonth />}>With calendar icon before contents</ToggleButton>
      <ToggleButton icon={<CalendarMonth />} iconPosition="after">
        With calendar icon after contents
      </ToggleButton>
      <Tooltip content="With calendar icon only" relationship="label">
        <ToggleButton icon={<CalendarMonth />} aria-label="Icon only" />
      </Tooltip>
    </div>
  );
};

Icon.parameters = {
  docs: {
    description: {
      story:
        'The ToggleButton has an `icon` slot that, if specified, renders an icon either `before` ' +
        'or `after` the children, as specified by the `iconPosition` prop.',
    },
  },
};
