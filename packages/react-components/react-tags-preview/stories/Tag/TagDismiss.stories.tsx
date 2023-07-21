import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import { Tag } from '@fluentui/react-tags-preview';

const useContainerStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

export const Dismiss = () => {
  const containerStyles = useContainerStyles();
  return (
    <div className={containerStyles.root}>
      <Tag dismissible>Primary text</Tag>
      <Tag dismissible icon={<CalendarMonthRegular />}>
        Primary text
      </Tag>
      <Tag
        dismissible
        media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}
        secondaryText="Secondary text"
      >
        Primary text
      </Tag>
    </div>
  );
};

Dismiss.storyName = 'Dismiss';
Dismiss.parameters = {
  docs: {
    description: {
      story: 'A tag can have a button that dismisses it',
    },
  },
};
