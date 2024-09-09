import * as React from 'react';
import { makeStyles, CompoundButton } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  wrapper: {
    alignItems: 'center',
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Size = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" size="small">
        Size: small
      </CompoundButton>
      <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" size="medium">
        Size: medium
      </CompoundButton>
      <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" size="large">
        Size: large
      </CompoundButton>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A compound button supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
  },
};
