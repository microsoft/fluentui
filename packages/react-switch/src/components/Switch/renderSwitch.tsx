import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { switchShorthandProps } from './useSwitch';
import type { SwitchSlots, SwitchState } from './Switch.types';

/**
 * Render the final JSX of Switch
 */
export const renderSwitch = (state: SwitchState) => {
  const { slots, slotProps } = getSlots<SwitchSlots>(state, switchShorthandProps);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};
