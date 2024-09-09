import * as React from 'react';
import { Tag, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeStyles({
  container: {
    columnGap: '10px',
    display: 'flex',
  },
});
export const Appearance = () => {
  const styles = useContainerStyles();
  return (
    <div className={styles.container}>
      <Tag icon={<CalendarMonthRegular />} dismissible dismissIcon={{ 'aria-label': 'remove' }}>
        filled
      </Tag>
      <Tag appearance="outline" icon={<CalendarMonthRegular />} dismissible dismissIcon={{ 'aria-label': 'remove' }}>
        outline
      </Tag>
      <Tag appearance="brand" icon={<CalendarMonthRegular />} dismissible dismissIcon={{ 'aria-label': 'remove' }}>
        brand
      </Tag>
    </div>
  );
};

Appearance.storyName = 'Appearance';
Appearance.parameters = {
  docs: {
    description: {
      story: 'A tag can have a `filled`, `outline` or `brand` appearance. The default is `filled`.',
    },
  },
};
