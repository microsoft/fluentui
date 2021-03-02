import * as React from 'react';
import { SpinButton, ISpinButtonStyles, Position } from '@fluentui/react';

// By default the field grows to fit available width. Constrain the width instead.
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 75 } };

export const SpinButtonTopPositionExample: React.FunctionComponent = () => {
  return (
    <SpinButton
      label="With label above"
      labelPosition={Position.top}
      defaultValue="0"
      min={0}
      max={100}
      step={1}
      incrementButtonAriaLabel="Increase value by 1"
      decrementButtonAriaLabel="Decrease value by 1"
      styles={styles}
    />
  );
};
