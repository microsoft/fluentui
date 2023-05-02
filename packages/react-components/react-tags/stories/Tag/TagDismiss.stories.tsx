import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { Calendar3Day20Regular } from '@fluentui/react-icons';

import { Tag } from '@fluentui/react-tags';

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
      <Tag dismissable>Primary text</Tag>
      <Tag dismissable icon={<Calendar3Day20Regular />}>
        Primary text
      </Tag>
      <Tag
        dismissable
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
