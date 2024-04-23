import * as React from 'react';
import { makeStyles, ToggleButton, Tooltip } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Icon = () => {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
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
        case 3:
          setChecked3(!checked3);
          break;
      }
    },
    [checked1, checked2, checked3],
  );

  return (
    <div className={styles.wrapper}>
      <ToggleButton
        checked={checked1}
        icon={checked1 ? <CalendarMonth /> : <CalendarMonthRegular />}
        onClick={() => toggleChecked(1)}
      >
        With calendar icon before contents
      </ToggleButton>
      <ToggleButton
        checked={checked2}
        icon={checked2 ? <CalendarMonth /> : <CalendarMonthRegular />}
        iconPosition="after"
        onClick={() => toggleChecked(2)}
      >
        With calendar icon after contents
      </ToggleButton>
      <Tooltip content="With calendar icon only" relationship="label">
        <ToggleButton
          checked={checked3}
          icon={checked3 ? <CalendarMonth /> : <CalendarMonthRegular />}
          onClick={() => toggleChecked(3)}
        />
      </Tooltip>
    </div>
  );
};

Icon.parameters = {
  docs: {
    description: {
      story:
        'The ToggleButton has an `icon` slot that, if specified, renders an icon either `before` ' +
        'or `after` the children, as specified by the `iconPosition` prop.',
    },
  },
};
