import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { Calendar3Day20Regular } from '@fluentui/react-icons';

import { InteractionTag } from '@fluentui/react-tags';

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
      <InteractionTag media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Rounded</InteractionTag>
      <InteractionTag shape="circular" media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
        Circular
      </InteractionTag>

      <InteractionTag dismissible icon={<Calendar3Day20Regular />} secondaryText="Secondary text">
        Rounded
      </InteractionTag>
      <InteractionTag shape="circular" dismissible icon={<Calendar3Day20Regular />} secondaryText="Secondary text">
        Circular
      </InteractionTag>
    </div>
  );
};

Shape.storyName = 'Shape';
Shape.parameters = {
  docs: {
    description: {
      story: 'A InteractionTag can be rounded or circular,',
    },
  },
};
