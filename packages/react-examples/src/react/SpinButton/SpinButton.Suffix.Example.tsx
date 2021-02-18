import * as React from 'react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';

const suffix = ' cm';
const min = 0;
const max = 100;
// By default the field grows to fit available width. Constrain the width instead.
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 75 } };

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
const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
  const numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
    return String(Math.min(numericValue + 2, max)) + suffix;
  }
};

/** Decrement the value (or return nothing to keep the previous value if invalid) */
const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
  const numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
    return String(Math.max(numericValue - 2, min)) + suffix;
  }
};

/**
 * Clamp the value within the valid range (or return nothing to keep the previous value
 * if there's not valid numeric input)
 */
const onValidate = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
  let numericValue = getNumericPart(value);
  if (numericValue !== undefined) {
    numericValue = Math.min(numericValue, max);
    numericValue = Math.max(numericValue, min);
    return String(numericValue) + suffix;
  }
};

/** This will be called after each change */
const onChange = (event: React.SyntheticEvent<HTMLElement>, value?: string): void => {
  console.log('Value changed to ' + value);
};

export const SpinButtonSuffixExample: React.FunctionComponent = () => {
  return (
    <div>
      This SpinButton includes a suffix in the value and defines custom <code>onIncrement</code>,{' '}
      <code>onDecrement</code>, and <code>onValidate</code> handlers which work with the suffix. It also has an{' '}
      <code>onChange</code> handler.)
      <br />
      <br />
      <SpinButton
        label="With suffix"
        defaultValue={'7' + suffix}
        min={min}
        max={max}
        onValidate={onValidate}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onChange={onChange}
        incrementButtonAriaLabel="Increase value by 2"
        decrementButtonAriaLabel="Decrease value by 2"
        styles={styles}
      />
    </div>
  );
};
