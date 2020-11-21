import * as React from 'react';
import { SpinButton } from '@fluentui/react/lib/SpinButton';

const suffix = ' cm';
const min = 0;
const max = 100;

/** Remove the suffix or any other text after the numbers, or return undefined if not a number */
const getNumericPart = (value: string): number | undefined => {
  const valueRegex = /^(\d+(\.\d+)?).*/;
  if (valueRegex.test(value)) {
    const numericValue = Number(value.replace(valueRegex, '$1'));
    return isNaN(numericValue) ? undefined : numericValue;
  }
  return undefined;
};

/** Increment the value (or return nothing to keep the previous value if invalid) */
const onIncrement = (value: string) => {
  const numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
    return String(Math.min(numericValue + 2, max)) + suffix;
  }
};

/** Decrement the value (or return nothing to keep the previous value if invalid) */
const onDecrement = (value: string) => {
  const numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
    return String(Math.max(numericValue - 2, min)) + suffix;
  }
};

/**
 * Clamp the value within the valid range (or return nothing to keep the previous value
 * if there's not valid numeric input)
 */
const onValidate = (value: string) => {
  let numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
    numericValue = Math.min(numericValue, max);
    numericValue = Math.max(numericValue, min);
    return String(numericValue) + suffix;
  }
};

export const SpinButtonStatefulExample: React.FunctionComponent = () => {
  const [value, setValue] = React.useState<string>('7' + suffix);

  return (
    <div style={{ width: '400px' }}>
      <SpinButton
        label="SpinButton with custom implementation:"
        min={min}
        max={max}
        value={value}
        onValidate={onValidate}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={(ev, newValue) => {
          setValue(prevValue => newValue || prevValue); // revert to previous if empty
        }}
        incrementButtonAriaLabel="Increase value by 2"
        decrementButtonAriaLabel="Decrease value by 2"
      />
    </div>
  );
};
