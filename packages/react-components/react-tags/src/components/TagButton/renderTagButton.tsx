import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TagButtonState, TagButtonSlots } from './TagButton.types';

/**
 * Render the final JSX of TagButton
 */
export const renderTagButton_unstable = (state: TagButtonState) => {
  const { slots, slotProps } = getSlots<TagButtonSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
