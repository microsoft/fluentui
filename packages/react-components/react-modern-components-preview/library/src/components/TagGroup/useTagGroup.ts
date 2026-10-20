'use client';

import type * as React from 'react';
import { useTagGroup as useTagGroupBase } from '@fluentui/react-headless-components-preview/tag-group';
import type { TagGroupProps, TagGroupState } from './TagGroup.types';

/**
 * Create the state required to render TagGroup.
 */
export const useTagGroup = (props: TagGroupProps, ref: React.Ref<HTMLDivElement>): TagGroupState => {
  const { appearance = 'filled', size = 'medium', ...rest } = props;
  const state = useTagGroupBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-size': size,
    },
    appearance,
    size,
  };
};
