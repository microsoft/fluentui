import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { Calendar3Day20Regular } from '@fluentui/react-icons';

import { Tag, TagContent } from '@fluentui/react-tags';

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
      <Tag dismissible>
        <TagContent>Primary text</TagContent>
      </Tag>
      <Tag dismissible>
        <TagContent icon={<Calendar3Day20Regular />}>Primary text</TagContent>{' '}
      </Tag>
      <Tag dismissible>
        <TagContent media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />} secondaryText="Secondary text">
          Primary text
        </TagContent>
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
