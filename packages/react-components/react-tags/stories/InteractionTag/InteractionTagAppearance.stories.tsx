import * as React from 'react';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary, makeStyles } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useContainerStyles = makeStyles({
  container: {
    columnGap: '10px',
    display: 'flex',
  },
});
export const Appearance = () => {
  const styles = useContainerStyles();
  return (
    <div className={styles.container}>
      <InteractionTag>
        <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
          filled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag appearance="outline">
        <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
          outline
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag appearance="brand">
        <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
          brand
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
    </div>
  );
};

Appearance.storyName = 'Appearance';
Appearance.parameters = {
  docs: {
    description: {
      story: 'An InteractionTag can have a `filled`, `outline` or `brand` appearance. The default is `filled`.',
    },
  },
};
