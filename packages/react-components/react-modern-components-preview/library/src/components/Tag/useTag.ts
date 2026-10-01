'use client';

import * as React from 'react';
import { useTag as useTagBase } from '@fluentui/react-headless-components-preview/tag';
import type { TagProps, TagState } from './Tag.types';
import { useTagGroupVisualContext } from './tagVisualContext';

const avatarSizeMap = {
  medium: 28,
  small: 20,
  'extra-small': 16,
} as const;

/**
 * Create the state required to render Tag.
 */
export const useTag = (props: TagProps, ref: React.Ref<HTMLSpanElement | HTMLButtonElement>): TagState => {
  const context = useTagGroupVisualContext();
  const {
    appearance = context.appearance ?? 'filled',
    shape = context.shape ?? 'rounded',
    size = context.size ?? 'medium',
    ...rest
  } = props;
  const dismissIcon =
    props.dismissIcon === undefined
      ? { children: React.createElement('span', { 'aria-hidden': true, 'data-default-icon': '' }) }
      : props.dismissIcon;
  const state = useTagBase({ ...rest, dismissIcon }, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-has-dismiss-icon': state.dismissible && state.dismissIcon ? '' : undefined,
      'data-has-media': state.media || state.icon ? '' : undefined,
      'data-shape': shape,
      'data-size': size,
    },
    appearance,
    avatarShape: shape === 'circular' ? 'circular' : 'square',
    avatarSize: avatarSizeMap[size],
    shape,
    size,
  };
};
