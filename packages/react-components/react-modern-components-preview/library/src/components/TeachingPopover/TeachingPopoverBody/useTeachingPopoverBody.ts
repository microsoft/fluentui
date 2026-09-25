'use client';

import type * as React from 'react';
import { useTeachingPopoverBody as useTeachingPopoverBodyBase } from '@fluentui/react-headless-components-preview/teaching-popover';
import type { TeachingPopoverBodyProps, TeachingPopoverBodyState } from './TeachingPopoverBody.types';

export const useTeachingPopoverBody = (
  props: TeachingPopoverBodyProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverBodyState => {
  const state = useTeachingPopoverBodyBase(props, ref);
  return {
    ...state,
    media: state.media
      ? {
          ...state.media,
          'data-media-length': state.mediaLength,
        }
      : undefined,
  };
};
