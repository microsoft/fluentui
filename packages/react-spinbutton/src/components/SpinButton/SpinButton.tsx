import * as React from 'react';
import { useSpinButton_unstable } from './useSpinButton';
import type { SpinButtonProps } from './SpinButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A SpinButton allows someone to incrementally adjust a value in small steps.
 */
export const SpinButton: ForwardRefComponent<SpinButtonProps> = React.forwardRef((props, ref) => {
  const [state, render] = useSpinButton_unstable(props, ref);
  return render(state);
});

SpinButton.displayName = 'SpinButton';
