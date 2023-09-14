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
        <InteractionTagPrimary
          secondaryText="appearance=filled"
          icon={<CalendarMonthRegular />}
          hasSecondaryAction
          id="disabled-filled-primary"
        >
          disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary
          aria-label="remove"
          aria-labelledby="disabled-filled-primary disabled-filled-secondary"
          id="disabled-filled-secondary"
        />
      </InteractionTag>
      <InteractionTag disabled appearance="outline">
        <InteractionTagPrimary
          secondaryText="appearance=outline"
          icon={<CalendarMonthRegular />}
          hasSecondaryAction
          id="disabled-outline-primary"
        >
          disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary
          aria-label="remove"
          aria-labelledby="disabled-outline-primary disabled-outline-secondary"
          id="disabled-outline-secondary"
        />
      </InteractionTag>
      <InteractionTag disabled appearance="brand">
        <InteractionTagPrimary
          secondaryText="appearance=brand"
          icon={<CalendarMonthRegular />}
          hasSecondaryAction
          id="disabled-brand-primary"
        >
          disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary
          aria-label="remove"
          aria-labelledby="disabled-brand-primary disabled-brand-secondary"
          id="disabled-brand-secondary"
        />
      </InteractionTag>
    </div>
  );
};
