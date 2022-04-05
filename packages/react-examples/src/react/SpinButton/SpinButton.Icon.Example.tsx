import * as React from 'react';
import { SpinButton, ISpinButtonStyles, Stack, IStackTokens, IIconProps } from '@fluentui/react';

const stackTokens: IStackTokens = { childrenGap: 20 };
const iconProps: IIconProps = { iconName: 'IncreaseIndentLegacy' };
// By default the field grows to fit available width. Constrain the width instead.
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 75 } };

export const SpinButtonIconExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={stackTokens}>
      <SpinButton
        label="With icon"
        iconProps={iconProps}
        defaultValue="0"
        min={0}
        max={100}
        step={1}
        incrementButtonAriaLabel="Increase value by 1"
        decrementButtonAriaLabel="Decrease value by 1"
        styles={styles}
      />
      <SpinButton
        label="Disabled with icon"
        iconProps={iconProps}
        disabled={true}
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
