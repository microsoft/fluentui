import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { Calendar3Day20Regular } from '@fluentui/react-icons';

import { TagButton } from '@fluentui/react-tags';

const useContainerStyles = makeStyles({
  root: {
    display: 'grid',
    rowGap: '10px',
    columnGap: '10px',
    gridTemplateColumns: 'auto 1fr',
  },
});

export const Shape = () => {
  const containerStyles = useContainerStyles();
  return (
    <div className={containerStyles.root}>
      <TagButton media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Rounded</TagButton>
      <TagButton shape="circular" media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
        Circular
      </TagButton>

      <TagButton dismissible icon={<Calendar3Day20Regular />} secondaryText="Secondary text">
        Rounded
      </TagButton>
      <TagButton shape="circular" dismissible icon={<Calendar3Day20Regular />} secondaryText="Secondary text">
        Circular
      </TagButton>
    </div>
  );
};

Shape.storyName = 'Shape';
Shape.parameters = {
  docs: {
    description: {
      story: 'A TagButton can be rounded or circular,',
    },
  },
};
