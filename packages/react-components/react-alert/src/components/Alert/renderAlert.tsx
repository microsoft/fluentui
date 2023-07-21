/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';

import type { AlertState, AlertSlots } from './Alert.types';

export const renderAlert_unstable = (state: AlertState) => {
  const { slots, slotProps } = getSlotsNext<AlertSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.icon && <slots.icon {...slotProps.icon} />}
      {slots.avatar && <slots.avatar {...slotProps.avatar} />}
      {slotProps.root.children}
      {slots.action && <slots.action {...slotProps.action} />}
    </slots.root>
  );
};
