import * as React from 'react';
import { TagContextValues, TagState } from '../components/Tag/index';
import { InteractionTagContextValues } from '../InteractionTag';

export function useTagContextValues_unstable(
  state: Pick<TagState, 'avatarSize' | 'avatarShape'>,
): TagContextValues | InteractionTagContextValues {
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
