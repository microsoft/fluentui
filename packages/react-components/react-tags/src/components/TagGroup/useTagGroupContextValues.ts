import * as React from 'react';
import type { TagGroupContextValues, TagGroupState } from './TagGroup.types';

export function useTagGroupContextValues_unstable(state: TagGroupState): TagGroupContextValues {
  const { handleTagDismiss, size, appearance, dismissible, role } = state;
  return {
    tagGroup: React.useMemo(
      () => ({ handleTagDismiss, size, appearance, dismissible, role }),
      [handleTagDismiss, size, appearance, dismissible, role],
    ),
  };
}
