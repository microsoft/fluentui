import * as React from 'react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';

// By default the field grows to fit available width. Constrain the width instead.
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 75 } };

export const SpinButtonControlledExample: React.FunctionComponent = () => {
  const [value, setValue] = React.useState('5');

  const onChange = React.useCallback((event: React.SyntheticEvent<HTMLElement>, newValue?: string) => {
    if (newValue !== undefined) {
      // In reality this might have some additional validation or other special handling
      setValue(newValue);
    }
  }, []);

  // This SpinButton is controlled because it sets `value` instead of `defaultValue`.
  // This means that it will call `onChange` when the user makes updates, but those updates will
  // only be respected if `onChange` causes an update to the `value` prop.
  return (
    <SpinButton
      label="Controlled SpinButton"
      value={value}
      min={0}
      max={100}
      step={1}
      onChange={onChange}
      incrementButtonAriaLabel="Increase value by 1"
      decrementButtonAriaLabel="Decrease value by 1"
      styles={styles}
    />
  );
};
