import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { switchShorthandProps } from './useSwitch';
import type { SwitchState } from './Switch.types';

/**
 * Render the final JSX of Switch
 */
export const renderSwitch = (state: SwitchState) => {
  const { slots, slotProps } = getSlotsCompat(state, switchShorthandProps);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};
