import * as React from 'react';
import { useSpinButton } from './useSpinButton';
import { renderSpinButton } from './renderSpinButton';
import { useSpinButtonStyles } from './useSpinButtonStyles';
import type { SpinButtonProps } from './SpinButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A SpinButton allows someone to incrementally adjust a value in small steps.
 */
export const SpinButton: ForwardRefComponent<SpinButtonProps> = React.forwardRef((props, ref) => {
  const state = useSpinButton(props, ref);

  useSpinButtonStyles(state);
  return renderSpinButton(state);
});

SpinButton.displayName = 'SpinButton';
