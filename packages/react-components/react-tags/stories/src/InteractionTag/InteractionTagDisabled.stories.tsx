import * as React from 'react';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary, makeStyles } from '@fluentui/react-components';
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
          Disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag disabled appearance="outline">
        <InteractionTagPrimary secondaryText="appearance=outline" icon={<CalendarMonthRegular />} hasSecondaryAction>
          Disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag disabled appearance="brand">
        <InteractionTagPrimary secondaryText="appearance=brand" icon={<CalendarMonthRegular />} hasSecondaryAction>
          Disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
    </div>
  );
};
