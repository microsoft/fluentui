import * as React from 'react';
import type { TagGroupContextValue } from '../../contexts/TagGroupContext';
import type { TagGroupState } from './TagGroup.types';

export function useTagGroupContextValue_unstable(state: TagGroupState): TagGroupContextValue {
  const { size } = state;
  return React.useMemo(() => ({ size }), [size]);
}
