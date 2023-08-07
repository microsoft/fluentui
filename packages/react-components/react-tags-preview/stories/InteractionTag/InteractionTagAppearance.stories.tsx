import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { InteractionTag, Primary, Secondary } from '@fluentui/react-tags-preview';
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
        <Primary icon={<CalendarMonth />} hasSecondaryAction>
          filled
        </Primary>
        <Secondary />
      </InteractionTag>
      <InteractionTag appearance="outline">
        <Primary icon={<CalendarMonth />} hasSecondaryAction>
          outline
        </Primary>
        <Secondary />
      </InteractionTag>
      <InteractionTag appearance="brand">
        <Primary icon={<CalendarMonth />} hasSecondaryAction>
          brand
        </Primary>
        <Secondary />
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
