import * as React from 'react';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { makeStyles, Button, Tooltip } from '@fluentui/react-components';

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
      <Button icon={<CalendarMonth />}>With calendar icon before contents</Button>
      <Button icon={<CalendarMonth />} iconPosition="after">
        With calendar icon after contents
      </Button>
      <Tooltip content="With calendar icon only" relationship="label">
        <Button icon={<CalendarMonth />} />
      </Tooltip>
    </div>
  );
};

Icon.parameters = {
  docs: {
    description: {
      story:
        'Button has an `icon` slot that, if specified, renders an icon either `before` or `after` the children, ' +
        'as specified by the `iconPosition` prop.',
    },
  },
};
