import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TagGroupState, TagGroupSlots } from './TagGroup.types';
import { TagGroupContextProvider, TagGroupContextValue } from '../../contexts/TagGroupContext';

/**
 * Render the final JSX of TagGroup
 */
export const renderTagGroup_unstable = (state: TagGroupState, contextValue: TagGroupContextValue) => {
  const { slots, slotProps } = getSlots<TagGroupSlots>(state);

  return (
    <TagGroupContextProvider value={contextValue}>
      <slots.root {...slotProps.root} />
    </TagGroupContextProvider>
  );
};
