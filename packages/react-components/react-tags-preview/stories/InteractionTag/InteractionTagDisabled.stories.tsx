import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { InteractionTag } from '@fluentui/react-tags-preview';
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
      <InteractionTag disabled secondaryText="appearance=filled" icon={<CalendarMonthRegular />} dismissible>
        disabled
      </InteractionTag>
      <InteractionTag
        disabled
        secondaryText="appearance=outline"
        appearance="outline"
        icon={<CalendarMonthRegular />}
        dismissible
      >
        disabled
      </InteractionTag>
      <InteractionTag
        disabled
        secondaryText="appearance=brand"
        appearance="brand"
        icon={<CalendarMonthRegular />}
        dismissible
      >
        disabled
      </InteractionTag>
    </div>
  );
};
