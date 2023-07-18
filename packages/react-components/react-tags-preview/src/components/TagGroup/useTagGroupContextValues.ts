import * as React from 'react';
import type { TagGroupContextValues, TagGroupState } from './TagGroup.types';

export function useTagGroupContextValues_unstable(state: TagGroupState): TagGroupContextValues {
  const { dismissible, handleTagDismiss, size } = state;
  return {
    tagGroup: React.useMemo(() => ({ dismissible, handleTagDismiss, size }), [dismissible, handleTagDismiss, size]),
  };
}
