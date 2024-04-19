import * as React from 'react';
import { makeStyles, CompoundButton } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Appearance = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonthRegular />}>
        Default
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" appearance="primary" icon={<CalendarMonthRegular />}>
        Primary
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" appearance="outline" icon={<CalendarMonth />}>
        Outline
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" appearance="subtle" icon={<CalendarMonth />}>
        Subtle
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" appearance="transparent" icon={<CalendarMonth />}>
        Transparent
      </CompoundButton>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        '- `(undefined)`: the compound button appears with the default style\n' +
        '- `primary`: emphasizes the compound button as a primary action.\n' +
        '- `outline`: removes background styling.\n' +
        '- `subtle`: minimizes emphasis to blend into the background until hovered or focused\n' +
        '- `transparent`: removes background and border styling.\n',
    },
  },
};
