'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSwitch } from './renderSwitch';
import { useSwitch } from './useSwitch';
import { useSwitchStyles } from './useSwitchStyles.styles';
import type { SwitchProps } from './Switch.types';

/**
 * Switch toggles a setting on or off.
 */
export const Switch: ForwardRefComponent<SwitchProps> = React.forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const state = useSwitch(props, ref);

    useSwitchStyles(state);

    return renderSwitch(state);
  },
);

Switch.displayName = 'Switch';
