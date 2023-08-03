import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { Tag } from '@fluentui/react-tags-preview';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeStyles({
  container: {
    columnGap: '10px',
    display: 'flex',
  },
});
export const Disabled = () => {
  const styles = useContainerStyles();
  return (
    <div className={styles.container}>
      <Tag disabled secondaryText="appearance=filled" icon={<CalendarMonthRegular />} dismissible>
        disabled
      </Tag>
      <Tag disabled secondaryText="appearance=outline" appearance="outline" icon={<CalendarMonthRegular />} dismissible>
        disabled
      </Tag>
      <Tag disabled secondaryText="appearance=brand" appearance="brand" icon={<CalendarMonthRegular />} dismissible>
        disabled
      </Tag>
    </div>
  );
};
