import * as React from 'react';

import { getSlots } from '@fluentui/react-utilities';

import type { AlertState, AlertSlots } from './Alert.types';

export const renderAlert_unstable = (state: AlertState) => {
  const { slots, slotProps } = getSlots<AlertSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.icon && <slots.icon {...slotProps.icon} />}
      {slotProps.root.children}
      {slots.action && <slots.action {...slotProps.action} />}
    </slots.root>
  );
};
