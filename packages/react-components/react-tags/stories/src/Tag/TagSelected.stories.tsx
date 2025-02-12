import * as React from 'react';
import { Tag, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeStyles({
  container: {
    columnGap: '10px',
    display: 'flex',
  },
});

export const Selected = () => {
  const styles = useContainerStyles();

  return (
    <div className={styles.container}>
      <Tag
        selected
        secondaryText="appearance=filled"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Selected
      </Tag>
      <Tag
        selected
        secondaryText="appearance=outline"
        appearance="outline"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Selected
      </Tag>
      <Tag
        selected
        secondaryText="appearance=brand"
        appearance="brand"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Selected
      </Tag>
    </div>
  );
};
