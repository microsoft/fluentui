import { Position } from '@fluentui/react';
import type { ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { SpinButton } from '@fluentui/react/lib/SpinButton';
import type { IStackTokens } from '@fluentui/react/lib/Stack';
import { Stack } from '@fluentui/react/lib/Stack';
import * as React from 'react';

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
    </Stack>
  );
};
