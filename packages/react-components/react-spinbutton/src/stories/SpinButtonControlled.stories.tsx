import * as React from 'react';
import { SpinButton, SpinButtonProps } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';

export const Controlled = () => {
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
    <>
      <Label htmlFor={id}>Controlled SpinButton</Label>
      <SpinButton value={spinButtonValue} onChange={onSpinButtonChange} id={id} />
    </>
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
