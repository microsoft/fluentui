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
export const Appearance = () => {
  const styles = useContainerStyles();
  return (
    <div className={styles.container}>
      <Tag icon={<CalendarMonthRegular />} dismissible>
        filled
      </Tag>
      <Tag appearance="outline" icon={<CalendarMonthRegular />} dismissible>
        outline
      </Tag>
      <Tag appearance="brand" icon={<CalendarMonthRegular />} dismissible>
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
