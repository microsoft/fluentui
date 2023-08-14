import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary } from '@fluentui/react-tags-preview';

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
      <InteractionTag>
        <InteractionTagPrimary hasSecondaryAction>Primary text</InteractionTagPrimary>
        <InteractionTagSecondary />
      </InteractionTag>
      <InteractionTag>
        <InteractionTagPrimary icon={<CalendarMonthRegular />} hasSecondaryAction>
          Primary text
        </InteractionTagPrimary>
        <InteractionTagSecondary />
      </InteractionTag>
      <InteractionTag>
        <InteractionTagPrimary
          media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}
          secondaryText="Secondary text"
          hasSecondaryAction
        >
          Primary text
        </InteractionTagPrimary>
        <InteractionTagSecondary />
      </InteractionTag>
    </div>
  );
};

Dismiss.storyName = 'Dismiss';
Dismiss.parameters = {
  docs: {
    description: {
      story: 'A InteractionTag can have a button that dismisses it',
    },
  },
};
