import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import { InteractionTag, Primary, Secondary } from '@fluentui/react-tags-preview';

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
      <InteractionTag>
        <Primary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Rounded</Primary>
      </InteractionTag>
      <InteractionTag shape="circular">
        <Primary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Circular</Primary>
      </InteractionTag>

      <InteractionTag>
        <Primary icon={<CalendarMonthRegular />} secondaryText="Secondary text" hasSecondaryAction>
          Rounded
        </Primary>
        <Secondary />
      </InteractionTag>
      <InteractionTag shape="circular">
        <Primary icon={<CalendarMonthRegular />} secondaryText="Secondary text" hasSecondaryAction>
          Circular
        </Primary>
        <Secondary />
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
