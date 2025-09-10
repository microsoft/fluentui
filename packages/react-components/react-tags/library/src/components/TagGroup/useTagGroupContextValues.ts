import * as React from 'react';
import type { TagGroupContextValues, TagGroupState } from './TagGroup.types';

export function useTagGroupContextValues_unstable(state: TagGroupState): TagGroupContextValues {
  const { handleTagDismiss, handleTagSelect, selectedValues, size, disabled, appearance, dismissible, role } = state;
  return {
    tagGroup: React.useMemo(
      () => ({ handleTagDismiss, handleTagSelect, selectedValues, size, disabled, appearance, dismissible, role }),
      [handleTagDismiss, handleTagSelect, selectedValues, size, disabled, appearance, dismissible, role],
    ),
  };
}
