import * as React from 'react';
import type { TagContentContextValues, TagContentState } from './TagContent.types';

export function useTagContentContextValues_unstable(state: TagContentState): TagContentContextValues {
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
