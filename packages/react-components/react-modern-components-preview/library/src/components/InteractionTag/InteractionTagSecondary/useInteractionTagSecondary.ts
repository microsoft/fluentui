'use client';

import * as React from 'react';
import { useInteractionTagSecondary as useInteractionTagSecondaryBase } from '@fluentui/react-headless-components-preview/interaction-tag';
import { useInteractionTagVisualContext } from '../../Tag/tagVisualContext';
import type { InteractionTagSecondaryProps, InteractionTagSecondaryState } from './InteractionTagSecondary.types';

export const useInteractionTagSecondary = (
  props: InteractionTagSecondaryProps,
  ref: React.Ref<HTMLButtonElement>,
): InteractionTagSecondaryState => {
  const { appearance = 'filled', shape = 'rounded', size = 'medium' } = useInteractionTagVisualContext();
  const state = useInteractionTagSecondaryBase(props, ref);
  const children = state.root.children ?? React.createElement('span', { 'aria-hidden': true, 'data-default-icon': '' });

  return {
    ...state,
    root: {
      ...state.root,
      children,
      'data-appearance': appearance,
      'data-shape': shape,
      'data-size': size,
    },
    appearance,
    shape,
    size,
  };
};
