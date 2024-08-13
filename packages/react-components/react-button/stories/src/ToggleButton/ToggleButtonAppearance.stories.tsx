import * as React from 'react';
import { makeStyles, ToggleButton } from '@fluentui/react-components';
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
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const styles = useStyles();

  const toggleChecked = React.useCallback(
    (buttonIndex: number) => {
      switch (buttonIndex) {
        case 1:
          setChecked1(!checked1);
          break;
        case 2:
          setChecked2(!checked2);
          break;
      }
    },
    [checked1, checked2],
  );

  return (
    <div className={styles.wrapper}>
      <ToggleButton
        checked={checked1}
        icon={checked1 ? <CalendarMonth /> : <CalendarMonthRegular />}
        onClick={() => toggleChecked(1)}
      >
        Default
      </ToggleButton>
      <ToggleButton
        appearance="primary"
        checked={checked2}
        icon={checked2 ? <CalendarMonth /> : <CalendarMonthRegular />}
        onClick={() => toggleChecked(2)}
      >
        Primary
      </ToggleButton>
      <ToggleButton appearance="outline" icon={<CalendarMonth />} onClick={() => toggleChecked(3)}>
        Outline
      </ToggleButton>
      <ToggleButton appearance="subtle" icon={<CalendarMonth />}>
        Subtle
      </ToggleButton>
      <ToggleButton appearance="transparent" icon={<CalendarMonth />}>
        Transparent
      </ToggleButton>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        '- `(undefined)`: the toggle button appears with the default style\n' +
        '- `primary`: emphasizes the toggle button as a primary action.\n' +
        '- `outline`: removes background styling.\n' +
        '- `subtle`: minimizes emphasis to blend into the background until hovered or focused\n' +
        '- `transparent`: removes background and border styling.\n',
    },
  },
};
