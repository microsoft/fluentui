import * as React from 'react';
import { useSwitch } from './useSwitch';
import { SwitchProps } from './Switch.types';
import { renderSwitch } from './renderSwitch';
import { useSwitchStyles } from './useSwitchStyles';

/**
 * Switch component
 */
export const Switch = React.forwardRef<HTMLElement, SwitchProps>((props, ref) => {
  const state = useSwitch(props, ref);

  useSwitchStyles(state);
  return renderSwitch(state);
});

Switch.displayName = 'Switch';
