import * as React from 'react';
import { SpinButton, SpinButtonProps } from '@fluentui/react-spinbutton';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { makeStyles } from '@griffel/react';

const useLayoutStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

export const Controlled = () => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  const [spinButtonValue, setSpinButtonValue] = React.useState<number | null>(10);

  const onSpinButtonChange: SpinButtonProps['onChange'] = React.useCallback(
    (_ev, data) => {
      console.log('onSpinButtonChange', data.value, data.displayValue);
      if (data.value !== undefined) {
        setSpinButtonValue(data.value);
      } else if (data.displayValue !== undefined) {
        const newValue = parseFloat(data.displayValue);
        if (!Number.isNaN(newValue)) {
          setSpinButtonValue(newValue);
        } else {
          console.error(`Cannot parse "${data.displayValue}" as a number.`);
        }
      }
    },
    [setSpinButtonValue],
  );

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Controlled SpinButton</Label>
      <SpinButton value={spinButtonValue} onChange={onSpinButtonChange} id={id} />
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story: `SpinButton can be a controlled input where the value and, optionally, the display value
      are stored in state and updated with \`onChange\`.`,
    },
  },
};
