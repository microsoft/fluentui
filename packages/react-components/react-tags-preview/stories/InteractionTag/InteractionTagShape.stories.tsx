import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import { InteractionTag } from '@fluentui/react-tags-preview';

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

      <InteractionTag dismissible icon={<CalendarMonthRegular />} secondaryText="Secondary text">
        Rounded
      </InteractionTag>
      <InteractionTag shape="circular" dismissible icon={<CalendarMonthRegular />} secondaryText="Secondary text">
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
