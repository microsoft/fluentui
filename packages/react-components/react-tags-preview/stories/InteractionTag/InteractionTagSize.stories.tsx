import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import { InteractionTag } from '@fluentui/react-tags-preview';

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
        <InteractionTag>Medium</InteractionTag>
        <InteractionTag dismissible media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
          Medium dismissible
        </InteractionTag>
        <InteractionTag icon={<CalendarMonthRegular />} shape="circular">
          Medium circular
        </InteractionTag>
      </div>
      <div className={styles.innerWrapper}>
        <InteractionTag size="small">Small</InteractionTag>

        <InteractionTag dismissible size="small" media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
          Small dismissible
        </InteractionTag>
        <InteractionTag size="small" icon={<CalendarMonthRegular />} shape="circular">
          Small circular
        </InteractionTag>
      </div>
      <div className={styles.innerWrapper}>
        <InteractionTag size="extra-small">Extra small</InteractionTag>

        <InteractionTag
          dismissible
          size="extra-small"
          media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}
        >
          Extra small dismissible
        </InteractionTag>
        <InteractionTag size="extra-small" icon={<CalendarMonthRegular />} shape="circular">
          Extra small circular
        </InteractionTag>
      </div>
    </div>
  );
};

Size.storyName = 'Size';
Size.parameters = {
  docs: {
    description: {
      story: 'A InteractionTag supports `medium`, `small` and `extra-small` size. Default size is `medium`.',
    },
  },
};
