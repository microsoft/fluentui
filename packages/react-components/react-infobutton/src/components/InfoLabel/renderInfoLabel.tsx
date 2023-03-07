import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { InfoLabelState, InfoLabelSlots } from './InfoLabel.types';

/**
 * Render the final JSX of InfoLabel
 */
export const renderInfoLabel_unstable = (state: InfoLabelState) => {
  const { slots, slotProps } = getSlots<InfoLabelSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
