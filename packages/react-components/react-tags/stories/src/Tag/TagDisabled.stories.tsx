import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tag, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeStyles({
  container: {
    columnGap: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
});
export const Disabled = (): JSXElement => {
  const styles = useContainerStyles();
  return (
    <div className={styles.container}>
      <Tag
        disabled
        secondaryText="appearance=filled"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Disabled
      </Tag>
      <Tag
        disabled
        secondaryText="appearance=outline"
        appearance="outline"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Disabled
      </Tag>
      <Tag
        disabled
        secondaryText="appearance=brand"
        appearance="brand"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Disabled
      </Tag>
    </div>
  );
};
