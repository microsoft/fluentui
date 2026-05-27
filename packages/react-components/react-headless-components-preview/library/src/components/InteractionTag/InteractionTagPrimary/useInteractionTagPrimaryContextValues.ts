'use client';

import * as React from 'react';

import type { InteractionTagPrimaryContextValues, InteractionTagPrimaryState } from './InteractionTagPrimary.types';

const emptyAvatarContext = { size: undefined, shape: undefined } as const;

export const useInteractionTagPrimaryContextValues = (
  _state: InteractionTagPrimaryState,
): InteractionTagPrimaryContextValues => {
  const avatar = React.useMemo(() => emptyAvatarContext, []);
  return { avatar };
};
