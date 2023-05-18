import * as React from 'react';
import type { TagGroupContextValues, TagGroupState } from './TagGroup.types';

export function useTagGroupContextValues_unstable(state: TagGroupState): TagGroupContextValues {
  const { size } = state;
  return React.useMemo(() => ({ tagGroup: { size } }), [size]);
}
