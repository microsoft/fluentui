import * as React from 'react';

import { getSlots } from '@fluentui/react-utilities';
import type { InfoLabelSlots, InfoLabelState } from './InfoLabel.types';

/**
 * Render the final JSX of InfoLabel
 */
export const renderInfoLabel_unstable = (state: InfoLabelState) => {
  const { slots, slotProps } = getSlots<InfoLabelSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.label {...slotProps.label} />
      {slots.infoButton && <slots.infoButton {...slotProps.infoButton} />}
    </slots.root>
  );
};
