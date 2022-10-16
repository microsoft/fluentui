import * as React from 'react';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { makeStyles, CompoundButton, Tooltip } from '@fluentui/react-components';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  wrapper: {
    alignItems: 'center',
    columnGap: '15px',
    display: 'flex',
  },
});

export const Icon = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonth />}>
        With calendar icon before contents
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonth />} iconPosition="after">
        With calendar icon after contents
      </CompoundButton>
      <Tooltip content="With calendar icon only" relationship="label">
        <CompoundButton icon={<CalendarMonth />} />
      </Tooltip>
    </div>
  );
};

Icon.parameters = {
  docs: {
    description: {
      story:
        'The CompoundButton has an `icon` slot that, if specified, renders an icon either `before` ' +
        'or `after` the children, as specified by the `iconPosition` prop.',
    },
  },
};
