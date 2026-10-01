'use client';

import type * as React from 'react';
import { useNavDivider as useNavDividerBase } from '@fluentui/react-headless-components-preview/nav';
import type { NavDividerProps, NavDividerState } from './NavDivider.types';

export const useNavDivider = (props: NavDividerProps, ref: React.Ref<HTMLDivElement>): NavDividerState => {
  const { alignContent = 'center', appearance = 'strong', inset = false, ...rest } = props;
  const state = useNavDividerBase(rest, ref);

  return {
    ...state,
    alignContent,
    appearance,
    inset,
    root: {
      ...state.root,
      'data-align-content': alignContent,
      'data-appearance': appearance,
      'data-inset': inset ? '' : undefined,
    },
  };
};
