import * as React from 'react';
import { Tag, Avatar, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeStyles({
  innerWrapper: {
    alignItems: 'start',
    columnGap: '10px',
    display: 'flex',
  },
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});
export const Size = () => {
  const styles = useContainerStyles();
  return (
    <div className={styles.outerWrapper}>
      {/* medium */}
      <div className={styles.innerWrapper}>
        <Tag>Medium</Tag>
        <Tag
          dismissible
          dismissIcon={{ 'aria-label': 'remove' }}
          media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}
        >
          Medium dismissible
        </Tag>
        <Tag icon={<CalendarMonthRegular />} shape="circular">
          Medium circular
        </Tag>
      </div>

      {/* small */}
      <div className={styles.innerWrapper}>
        <Tag size="small">Small</Tag>
        <Tag
          dismissible
          dismissIcon={{ 'aria-label': 'remove' }}
          size="small"
          media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}
        >
          Small dismissible
        </Tag>
        <Tag size="small" icon={<CalendarMonthRegular />} shape="circular">
          Small circular
        </Tag>
      </div>

      {/* extra-small */}
      <div className={styles.innerWrapper}>
        <Tag size="extra-small">Extra small</Tag>
        <Tag
          dismissible
          dismissIcon={{ 'aria-label': 'remove' }}
          size="extra-small"
          media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}
        >
          Extra small dismissible
        </Tag>
        <Tag size="extra-small" icon={<CalendarMonthRegular />} shape="circular">
          Extra small circular
        </Tag>
      </div>
    </div>
  );
};

Size.storyName = 'Size';
Size.parameters = {
  docs: {
    description: { story: 'A tag supports `medium`, `small` and `extra-small` size. Default size is `medium`.' },
  },
};
