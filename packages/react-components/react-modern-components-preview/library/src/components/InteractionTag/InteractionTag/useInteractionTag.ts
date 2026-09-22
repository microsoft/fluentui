'use client';

import type * as React from 'react';
import { useInteractionTag as useInteractionTagBase } from '@fluentui/react-headless-components-preview/interaction-tag';
import { useTagGroupVisualContext } from '../../Tag/tagVisualContext';
import type { InteractionTagProps, InteractionTagState } from './InteractionTag.types';

export const useInteractionTag = (props: InteractionTagProps, ref: React.Ref<HTMLDivElement>): InteractionTagState => {
  const context = useTagGroupVisualContext();
  const {
    appearance = context.appearance ?? 'filled',
    shape = context.shape ?? 'rounded',
    size = context.size ?? 'medium',
    ...rest
  } = props;
  const state = useInteractionTagBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-shape': shape,
      'data-size': size,
    },
    appearance,
    shape,
    size,
  };
};
