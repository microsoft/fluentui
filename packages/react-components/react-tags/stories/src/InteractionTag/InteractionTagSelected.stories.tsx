import * as React from 'react';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular, CalendarMonthFilled, bundleIcon } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useContainerStyles = makeStyles({
  container: {
    columnGap: '10px',
    display: 'flex',
  },
});

export const Selected = () => {
  const styles = useContainerStyles();

  return (
    <div className={styles.container}>
      <InteractionTag selected>
        <InteractionTagPrimary secondaryText="appearance=filled" icon={<CalendarMonth />} hasSecondaryAction>
          Selected
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag selected appearance="outline">
        <InteractionTagPrimary secondaryText="appearance=outline" icon={<CalendarMonth />} hasSecondaryAction>
          Selected
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag selected appearance="brand">
        <InteractionTagPrimary secondaryText="appearance=brand" icon={<CalendarMonth />} hasSecondaryAction>
          Selected
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
    </div>
  );
};
