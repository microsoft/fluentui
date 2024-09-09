/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { TagGroupState, TagGroupSlots, TagGroupContextValues } from './TagGroup.types';
import { TagGroupContextProvider } from '../../contexts/tagGroupContext';

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
