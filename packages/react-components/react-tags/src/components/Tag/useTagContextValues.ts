import * as React from 'react';
import { TagState, TagContextValues } from './Tag.types';

export function useTagContextValues_unstable(state: TagState): TagContextValues {
  const { avatarSize, avatarShape } = state;

  const avatar = React.useMemo(
    () => ({
      size: avatarSize,
      shape: avatarShape,
    }),
    [avatarShape, avatarSize],
  );

  return {
    avatar,
  };
}
