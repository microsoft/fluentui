import * as React from 'react';
import { makeStyles, CompoundButton, Tooltip } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  wrapper: {
    alignItems: 'center',
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Icon = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonthRegular />}>
        With calendar icon before contents
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonthRegular />} iconPosition="after">
        With calendar icon after contents
      </CompoundButton>
      <Tooltip content="With calendar icon only" relationship="label">
        <CompoundButton icon={<CalendarMonthRegular />} />
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
