import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { InteractionTag } from '@fluentui/react-tags-preview';
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
      <InteractionTag icon={<CalendarMonth />} dismissible>
        filled
      </InteractionTag>
      <InteractionTag appearance="outline" icon={<CalendarMonth />} dismissible>
        outline
      </InteractionTag>
      <InteractionTag appearance="brand" icon={<CalendarMonth />} dismissible>
        brand
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
