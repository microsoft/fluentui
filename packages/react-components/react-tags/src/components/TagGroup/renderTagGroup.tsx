/** @jsxRuntime classic */
/** @jsx createElement */
import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TagGroupState, TagGroupSlots, TagGroupContextValues } from './TagGroup.types';
import { TagGroupContextProvider } from '../../contexts/TagGroupContext';

/**
 * Render the final JSX of TagGroup
 */
export const renderTagGroup_unstable = (state: TagGroupState, contextValue: TagGroupContextValues) => {
  const { slots, slotProps } = getSlotsNext<TagGroupSlots>(state);

  return (
    <TagGroupContextProvider value={contextValue.tagGroup}>
      <slots.root {...slotProps.root} />
    </TagGroupContextProvider>
  );
};
