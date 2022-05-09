import * as React from 'react';
import { useSwitch_unstable } from './useSwitch';
import { renderSwitch_unstable } from './renderSwitch';
import { useSwitchStyles_unstable } from './useSwitchStyles';
import type { SwitchProps } from './Switch.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Switches enable users to trigger an option on or off through pressing the component.
 */
export const Switch: ForwardRefComponent<SwitchProps> = React.forwardRef((props, ref) => {
  const state = useSwitch_unstable(props, ref);

  useSwitchStyles_unstable(state);

  return renderSwitch_unstable(state);
});

Switch.displayName = 'Switch';
