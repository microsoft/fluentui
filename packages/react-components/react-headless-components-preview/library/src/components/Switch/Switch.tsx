'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SwitchProps } from './Switch.types';
import { useSwitch } from './useSwitch';
import { renderSwitch } from './renderSwitch';

/**
 * A switch component for toggling values.
 */
export const Switch: ForwardRefComponent<SwitchProps> = React.forwardRef((props, ref) => {
  const state = useSwitch(props, ref);

  return renderSwitch(state);
});

Switch.displayName = 'Switch';
