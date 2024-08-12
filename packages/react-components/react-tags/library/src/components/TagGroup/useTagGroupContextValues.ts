import * as React from 'react';
import type { TagGroupContextValues, TagGroupState } from './TagGroup.types';

export function useTagGroupContextValues_unstable(state: TagGroupState): TagGroupContextValues {
  const { handleTagDismiss, size, disabled, appearance, dismissible, role } = state;
  return {
    tagGroup: React.useMemo(
      () => ({ handleTagDismiss, size, disabled, appearance, dismissible, role }),
      [handleTagDismiss, size, disabled, appearance, dismissible, role],
    ),
  };
}
