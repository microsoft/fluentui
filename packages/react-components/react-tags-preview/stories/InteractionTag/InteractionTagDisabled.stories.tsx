import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { InteractionTag, Primary, Secondary } from '@fluentui/react-tags-preview';
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
        <Primary secondaryText="appearance=filled" icon={<CalendarMonthRegular />} hasSecondaryAction>
          disabled
        </Primary>
        <Secondary />
      </InteractionTag>
      <InteractionTag disabled appearance="outline">
        <Primary secondaryText="appearance=outline" icon={<CalendarMonthRegular />} hasSecondaryAction>
          disabled
        </Primary>
        <Secondary />
      </InteractionTag>
      <InteractionTag disabled appearance="brand">
        <Primary secondaryText="appearance=brand" icon={<CalendarMonthRegular />} hasSecondaryAction>
          disabled
        </Primary>
        <Secondary />
      </InteractionTag>
    </div>
  );
};
