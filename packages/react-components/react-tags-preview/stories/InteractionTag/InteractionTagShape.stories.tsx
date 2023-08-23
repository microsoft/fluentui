import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary } from '@fluentui/react-tags-preview';

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
        <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
          Rounded
        </InteractionTagPrimary>
      </InteractionTag>
      <InteractionTag shape="circular">
        <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
          Circular
        </InteractionTagPrimary>
      </InteractionTag>

      <InteractionTag>
        <InteractionTagPrimary icon={<CalendarMonthRegular />} secondaryText="Secondary text" hasSecondaryAction>
          Rounded
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label={`Rounded, remove`} />
      </InteractionTag>
      <InteractionTag shape="circular">
        <InteractionTagPrimary icon={<CalendarMonthRegular />} secondaryText="Secondary text" hasSecondaryAction>
          Circular
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label={`Circular, remove`} />
      </InteractionTag>
    </div>
  );
};

Shape.storyName = 'Shape';
Shape.parameters = {
  docs: {
    description: {
      story: 'An InteractionTag can be rounded or circular,',
    },
  },
};
