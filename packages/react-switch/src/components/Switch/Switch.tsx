import * as React from 'react';
import { useSwitch } from './useSwitch';
import { renderSwitch } from './renderSwitch';
import { useSwitchStyles } from './useSwitchStyles';
import type { SwitchProps } from './Switch.types';

/**
 * Define a styled Switch, using the `useSwitch` hook.
 */
export const Switch = React.forwardRef<HTMLElement, SwitchProps>((props, ref) => {
  const state = useSwitch(props, ref);

  useSwitchStyles(state);

  return renderSwitch(state);
});
Switch.displayName = 'Switch';
