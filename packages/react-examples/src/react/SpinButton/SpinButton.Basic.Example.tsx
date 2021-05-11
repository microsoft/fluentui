import * as React from 'react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';

const stackTokens: IStackTokens = { childrenGap: 20 };
// By default the field grows to fit available width. Constrain the width instead.
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 75 } };

export const SpinButtonBasicExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={stackTokens}>
      <SpinButton
        label="Basic SpinButton"
        defaultValue="0"
        min={0}
        max={100}
        step={1}
        incrementButtonAriaLabel="Increase value by 1"
        decrementButtonAriaLabel="Decrease value by 1"
        styles={styles}
      />
      <SpinButton
        label="Decimal SpinButton"
        defaultValue="0"
        min={0}
        max={10}
        step={0.1}
        incrementButtonAriaLabel="Increase value by 0.1"
        decrementButtonAriaLabel="Decrease value by 0.1"
        styles={styles}
      />
      <SpinButton
        label="Disabled SpinButton"
        disabled={true}
        defaultValue="25"
        min={0}
        max={100}
        step={1}
        incrementButtonAriaLabel="Increase value by 1"
        decrementButtonAriaLabel="Decrease value by 1"
        styles={styles}
      />
    </Stack>
  );
};
