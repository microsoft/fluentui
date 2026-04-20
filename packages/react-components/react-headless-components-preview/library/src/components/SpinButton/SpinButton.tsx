'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SpinButtonProps } from './SpinButton.types';
import { useSpinButton } from './useSpinButton';
import { renderSpinButton } from './renderSpinButton';

/**
 * A spin button component for incrementing/decrementing values.
 */
export const SpinButton: ForwardRefComponent<SpinButtonProps> = React.forwardRef((props, ref) => {
  const state = useSpinButton(props, ref);

  return renderSpinButton(state);
});

SpinButton.displayName = 'SpinButton';
