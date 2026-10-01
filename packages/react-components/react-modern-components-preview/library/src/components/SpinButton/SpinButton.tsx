'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SpinButtonProps } from './SpinButton.types';
import { renderSpinButton } from './renderSpinButton';
import { useSpinButton } from './useSpinButton';
import { useSpinButtonStyles } from './useSpinButtonStyles.styles';

export const SpinButton: ForwardRefComponent<SpinButtonProps> = React.forwardRef((props, ref) => {
  const state = useSpinButton(props, ref);

  useSpinButtonStyles(state);

  return renderSpinButton(state);
});

SpinButton.displayName = 'SpinButton';
