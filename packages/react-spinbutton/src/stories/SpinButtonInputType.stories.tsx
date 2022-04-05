import * as React from 'react';
import { SpinButton, SpinButtonProps } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';

export const InputType = () => {
  const id = useId();
  const [spinButtonValue, setSpinButtonValue] = React.useState(10);

  const onSpinButtonChange: SpinButtonProps['onChange'] = React.useCallback(
    (_ev, data) => {
      console.log('onSpinButtonChange', data.value, data.displayValue);
      if (data.value !== undefined) {
        setSpinButtonValue(data.value);
      }
    },
    [setSpinButtonValue],
  );

  return (
    <>
      <Label htmlFor={id}>Spinners Only (Cannot type text)</Label>
      <SpinButton inputType="spinners-only" value={spinButtonValue} onChange={onSpinButtonChange} id={id} />
    </>
  );
};

InputType.parameters = {
  docs: {
    description: {
      story: `SpinButton has different input types that allow free-form input to be disabled`,
    },
  },
};
