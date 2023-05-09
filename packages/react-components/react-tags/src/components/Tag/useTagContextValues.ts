import * as React from 'react';
import type { TagContextValue, TagContextValues, TagState } from './Tag.types';

export function useTagContextValues_unstable(state: TagState): TagContextValues {
  const { dismissible, shape, size, interactive } = state;

  const tag = React.useMemo<TagContextValue>(
    () => ({
      dismissible,
      shape,
      size,
      interactive,
    }),
    [dismissible, interactive, shape, size],
  );

  return { tag };
}
