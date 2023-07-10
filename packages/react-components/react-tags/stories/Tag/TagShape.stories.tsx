import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { Calendar3Day20Regular } from '@fluentui/react-icons';

import { Tag } from '@fluentui/react-tags';

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
      <Tag media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Rounded</Tag>
      <Tag shape="circular" media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
        Circular
      </Tag>

      <Tag dismissible icon={<Calendar3Day20Regular />} secondaryText="Secondary text">
        Rounded
      </Tag>
      <Tag shape="circular" dismissible icon={<Calendar3Day20Regular />} secondaryText="Secondary text">
        Circular
      </Tag>
    </div>
  );
};

Shape.storyName = 'Shape';
Shape.parameters = {
  docs: {
    description: {
      story: 'A tag can be rounded or circular,',
    },
  },
};
