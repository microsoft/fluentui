import * as React from 'react';
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  Avatar,
  makeStyles,
} from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

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
          <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />} hasSecondaryAction>
            Medium dismissible
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="dismiss" />
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
          <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />} hasSecondaryAction>
            Small dismissible
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="dismiss" />
        </InteractionTag>

        <InteractionTag size="small" shape="circular">
          <InteractionTagPrimary icon={<CalendarMonthRegular />}>Small circular</InteractionTagPrimary>
        </InteractionTag>
      </div>

      {/* extra-small */}
      <div className={styles.innerWrapper}>
        <InteractionTag size="extra-small">
          <InteractionTagPrimary>Extra small</InteractionTagPrimary>
        </InteractionTag>

        <InteractionTag size="extra-small">
          <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />} hasSecondaryAction>
            Extra small dismissible
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="dismiss" />
        </InteractionTag>

        <InteractionTag size="extra-small" shape="circular">
          <InteractionTagPrimary icon={<CalendarMonthRegular />}>Extra small circular</InteractionTagPrimary>
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
