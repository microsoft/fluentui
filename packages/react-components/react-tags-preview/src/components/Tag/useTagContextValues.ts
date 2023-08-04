import * as React from 'react';
import { TagContextValues, TagState } from './Tag.types';

export function useTagContextValues_unstable(state: Pick<TagState, 'avatarSize' | 'avatarShape'>): TagContextValues {
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
