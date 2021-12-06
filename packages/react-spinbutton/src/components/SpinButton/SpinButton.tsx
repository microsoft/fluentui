import * as React from 'react';
import { useSpinButton } from './useSpinButton';
import { renderSpinButton } from './renderSpinButton';
import { useSpinButtonStyles } from './useSpinButtonStyles';
import type { SpinButtonProps } from './SpinButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * SpinButton component
 */
export const SpinButton: ForwardRefComponent<SpinButtonProps> = React.forwardRef((props, ref) => {
  const state = useSpinButton(props, ref);

  useSpinButtonStyles(state);
  return renderSpinButton(state);
});

SpinButton.displayName = 'SpinButton';
