'use client';

import type * as React from 'react';
import { useAvatarGroup as useAvatarGroupBase } from '@fluentui/react-headless-components-preview/avatar-group';
import type { AvatarGroupProps, AvatarGroupState } from './AvatarGroup.types';

/** Create the state required to render AvatarGroup. */
export const useAvatarGroup = (props: AvatarGroupProps, ref: React.Ref<HTMLDivElement>): AvatarGroupState => {
  const { size = 32, ...rest } = props;
  const state = useAvatarGroupBase(rest, ref);

  return {
    ...state,
    size,
    root: {
      ...state.root,
      'data-layout': state.layout,
      'data-size': `${size}`,
    },
  };
};
