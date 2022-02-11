import * as React from 'react';
import { useSwitch_unstable } from './useSwitch';
import type { SwitchProps } from './Switch.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The Switch control enables users to trigger an option on or off through pressing on the component.
 */
export const Switch: ForwardRefComponent<SwitchProps> = React.forwardRef((props, ref) => {
  const [state, render] = useSwitch_unstable(props, ref);
  return render(state);
});

Switch.displayName = 'Switch';
