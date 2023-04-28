import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TagGroupState, TagGroupSlots } from './TagGroup.types';

/**
 * Render the final JSX of TagGroup
 */
export const renderTagGroup_unstable = (state: TagGroupState) => {
  const { slots, slotProps } = getSlots<TagGroupSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
