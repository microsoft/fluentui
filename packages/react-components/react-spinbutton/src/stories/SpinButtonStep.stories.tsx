import * as React from 'react';
import { SpinButton, SpinButtonProps } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';

export const Step = () => {
  const id = useId();
  const [spinButtonValue, setSpinButtonValue] = React.useState(10);

  const onSpinButtonChange: SpinButtonProps['onChange'] = React.useCallback(
    (_ev, data) => {
      if (data.value !== undefined) {
        setSpinButtonValue(data.value);
      } else if (data.displayValue !== undefined) {
        const newValue = parseFloat(data.displayValue);
        if (!Number.isNaN(newValue)) {
          setSpinButtonValue(newValue);
        }
      }
    },
    [setSpinButtonValue],
  );

  return (
    <>
      <Label htmlFor={id}>Step Size</Label>
      <SpinButton value={spinButtonValue} step={2} stepPage={20} onChange={onSpinButtonChange} id={id} />
    </>
  );
};

Step.parameters = {
  docs: {
    description: {
      story: `SpinButton step size can be set. Additionally \`stepPage\` can be
      set to a large value to allow bulk steps via the \`Page Up\` and \`Page Down\` keys.`,
    },
  },
};
