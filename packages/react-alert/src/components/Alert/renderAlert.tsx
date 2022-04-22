import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { AlertState, AlertSlots } from './Alert.types';

/**
 * Render the final JSX of Alert
 */
export const renderAlert_unstable = (state: AlertState) => {
  const { slots, slotProps } = getSlots<AlertSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
