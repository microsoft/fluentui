'use client';

import * as React from 'react';

import type { TagContextValues, TagState } from './Tag.types';

const emptyAvatarContext = { size: undefined, shape: undefined } as const;

export const useTagContextValues = (_state: TagState): TagContextValues => {
  const avatar = React.useMemo(() => emptyAvatarContext, []);
  return { avatar };
};
