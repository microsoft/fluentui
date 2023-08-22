import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary } from '@fluentui/react-tags-preview';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeStyles({
  container: {
    columnGap: '10px',
    display: 'flex',
  },
});
export const Disabled = () => {
  const styles = useContainerStyles();
  return (
    <div className={styles.container}>
      <InteractionTag disabled>
        <InteractionTagPrimary secondaryText="appearance=filled" icon={<CalendarMonthRegular />} hasSecondaryAction>
          disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="filled disabled, remove" />
      </InteractionTag>
      <InteractionTag disabled appearance="outline">
        <InteractionTagPrimary secondaryText="appearance=outline" icon={<CalendarMonthRegular />} hasSecondaryAction>
          disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="outline disabled, remove" />
      </InteractionTag>
      <InteractionTag disabled appearance="brand">
        <InteractionTagPrimary secondaryText="appearance=brand" icon={<CalendarMonthRegular />} hasSecondaryAction>
          disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="brand disabled, remove" />
      </InteractionTag>
    </div>
  );
};
