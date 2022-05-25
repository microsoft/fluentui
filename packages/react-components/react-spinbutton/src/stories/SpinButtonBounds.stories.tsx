import * as React from 'react';
import { SpinButton, SpinButtonProps } from '../index';
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

export const Bounds = () => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  const [spinButtonValue, setSpinButtonValue] = React.useState(10);

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
          console.error(`"${data.displayValue}" is not a valid value.`);
        }
      }
    },
    [setSpinButtonValue],
  );

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Bounded SpinButton</Label>
      <SpinButton value={spinButtonValue} min={0} max={20} onChange={onSpinButtonChange} id={id} />
      <p>min: 0, max: 20</p>
    </div>
  );
};

Bounds.parameters = {
  docs: {
    description: {
      story: `SpinButton can be bounded with the \`min\` and \`max\` props.
      Using the spin buttons or hotkeys will clamp values in the range of [min, max].
      Users may type a value outside the range into the text input and it will not be clamped
      by the control.`,
    },
  },
};
