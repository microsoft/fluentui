import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary } from '@fluentui/react-tags-preview';
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
        <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction id="filled-primary">
          filled
        </InteractionTagPrimary>
        <InteractionTagSecondary
          aria-label="remove"
          aria-labelledby="filled-primary filled-secondary"
          id="filled-secondary"
        />
      </InteractionTag>
      <InteractionTag appearance="outline">
        <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction id="outline-primary">
          outline
        </InteractionTagPrimary>
        <InteractionTagSecondary
          aria-label="remove"
          aria-labelledby="outline-primary outline-secondary"
          id="outline-secondary"
        />
      </InteractionTag>
      <InteractionTag appearance="brand">
        <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction id="brand-primary">
          brand
        </InteractionTagPrimary>
        <InteractionTagSecondary
          aria-label="remove"
          aria-labelledby="brand-primary brand-secondary"
          id="brand-secondary"
        />
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
