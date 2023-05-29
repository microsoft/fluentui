/** @jsxRuntime classic */
/** @jsx createElement */
import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { TagGroupState, TagGroupSlots, TagGroupContextValues } from './TagGroup.types';
import { TagGroupContextProvider } from '../../contexts/TagGroupContext';

/**
 * Render the final JSX of TagGroup
 */
export const renderTagGroup_unstable = (state: TagGroupState, contextValue: TagGroupContextValues) => {
  assertSlots<TagGroupSlots>(state);

  return (
    <TagGroupContextProvider value={contextValue.tagGroup}>
      <state.root />
    </TagGroupContextProvider>
  );
};
