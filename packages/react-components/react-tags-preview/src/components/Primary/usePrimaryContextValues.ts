import * as React from 'react';
import { PrimaryState, PrimaryContextValues } from './Primary.types';

export function usePrimaryContextValues_unstable(
  state: Pick<PrimaryState, 'avatarSize' | 'avatarShape'>,
): PrimaryContextValues {
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
