import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { Calendar3Day20Regular } from '@fluentui/react-icons';

import { TagButton } from '@fluentui/react-tags';

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
      <TagButton dismissible>Primary text</TagButton>
      <TagButton dismissible icon={<Calendar3Day20Regular />}>
        Primary text
      </TagButton>
      <TagButton
        dismissible
        media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}
        secondaryText="Secondary text"
      >
        Primary text
      </TagButton>
    </div>
  );
};

Dismiss.storyName = 'Dismiss';
Dismiss.parameters = {
  docs: {
    description: {
      story: 'A TagButton can have a button that dismisses it',
    },
  },
};
