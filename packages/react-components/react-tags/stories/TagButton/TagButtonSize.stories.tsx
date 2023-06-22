import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import { TagButton } from '@fluentui/react-tags';

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
      <div className={styles.innerWrapper}>
        <TagButton>Medium</TagButton>
        <TagButton dismissible media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
          Medium dismissible
        </TagButton>
        <TagButton icon={<CalendarMonthRegular />} shape="circular">
          Medium circular
        </TagButton>
      </div>
      <div className={styles.innerWrapper}>
        <TagButton size="small">Small</TagButton>

        <TagButton dismissible size="small" media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
          Small dismissible
        </TagButton>
        <TagButton size="small" icon={<CalendarMonthRegular />} shape="circular">
          Small circular
        </TagButton>
      </div>
      <div className={styles.innerWrapper}>
        <TagButton size="extra-small">Extra small</TagButton>

        <TagButton dismissible size="extra-small" media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
          Extra small dismissible
        </TagButton>
        <TagButton size="extra-small" icon={<CalendarMonthRegular />} shape="circular">
          Extra small circular
        </TagButton>
      </div>
    </div>
  );
};

Size.storyName = 'Size';
Size.parameters = {
  docs: {
    description: { story: 'A TagButton supports `medium`, `small` and `extra-small` size. Default size is `medium`.' },
  },
};
