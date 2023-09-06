import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary } from '@fluentui/react-tags-preview';

const useContainerStyles = makeStyles({
  innerWrapper: {
    alignItems: 'start',
    columnGap: '10px',
    display: 'flex',
  },
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});
export const Size = () => {
  const styles = useContainerStyles();
  return (
    <div className={styles.outerWrapper}>
      {/* medium */}
      <div className={styles.innerWrapper}>
        <InteractionTag>
          <InteractionTagPrimary>Medium</InteractionTagPrimary>
        </InteractionTag>

        <InteractionTag>
          <InteractionTagPrimary
            media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}
            hasSecondaryAction
            id="medium-primary"
          >
            Medium dismissible
          </InteractionTagPrimary>
          <InteractionTagSecondary
            aria-label="dismiss"
            aria-labelledby="medium-primary medium-secondary"
            id="medium-secondary"
          />
        </InteractionTag>

        <InteractionTag shape="circular">
          <InteractionTagPrimary icon={<CalendarMonthRegular />}>Medium circular</InteractionTagPrimary>
        </InteractionTag>
      </div>

      {/* small */}
      <div className={styles.innerWrapper}>
        <InteractionTag size="small">
          <InteractionTagPrimary>Small</InteractionTagPrimary>
        </InteractionTag>

        <InteractionTag size="small">
          <InteractionTagPrimary
            media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}
            hasSecondaryAction
            id="small-primary"
          >
            Small dismissible
          </InteractionTagPrimary>
          <InteractionTagSecondary
            aria-label="dismiss"
            aria-labelledby="small-primary small-secondary"
            id="small-secondary"
          />
        </InteractionTag>

        <InteractionTag size="small" shape="circular">
          <InteractionTagPrimary icon={<CalendarMonthRegular />}>Small circular</InteractionTagPrimary>
        </InteractionTag>
      </div>

      {/* extra-small */}
      <div className={styles.innerWrapper}>
        <InteractionTag size="extra-small">
          <InteractionTagPrimary>Extra Small</InteractionTagPrimary>
        </InteractionTag>

        <InteractionTag size="extra-small">
          <InteractionTagPrimary
            media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}
            hasSecondaryAction
            id="extra-small-primary"
          >
            Extra Small dismissible
          </InteractionTagPrimary>
          <InteractionTagSecondary
            aria-label="dismiss"
            aria-labelledby="extra-small-primary extra-small-secondary"
            id="extra-small-secondary"
          />
        </InteractionTag>

        <InteractionTag size="extra-small" shape="circular">
          <InteractionTagPrimary icon={<CalendarMonthRegular />}>Extra Small circular</InteractionTagPrimary>
        </InteractionTag>
      </div>
    </div>
  );
};

Size.storyName = 'Size';
Size.parameters = {
  docs: {
    description: {
      story: 'An InteractionTag supports `medium`, `small` and `extra-small` size. Default size is `medium`.',
    },
  },
};
