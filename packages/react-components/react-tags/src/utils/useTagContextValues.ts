import * as React from 'react';
import { TagContextValues, TagState } from '../components/Tag/index';
import { TagButtonContextValues } from '../TagButton';

export function useTagContextValues_unstable(
  state: Pick<TagState, 'avatarSize' | 'avatarShape'>,
): TagContextValues | TagButtonContextValues {
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
