import * as React from 'react';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { makeStyles, CompoundButton } from '@fluentui/react-components';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  wrapper: {
    alignItems: 'center',
    columnGap: '15px',
    display: 'flex',
  },
});

export const Size = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <CompoundButton icon={<CalendarMonth />} secondaryContent="Secondary content" size="small">
        Size: small
      </CompoundButton>
      <CompoundButton icon={<CalendarMonth />} secondaryContent="Secondary content" size="medium">
        Size: medium
      </CompoundButton>
      <CompoundButton icon={<CalendarMonth />} secondaryContent="Secondary content" size="large">
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
