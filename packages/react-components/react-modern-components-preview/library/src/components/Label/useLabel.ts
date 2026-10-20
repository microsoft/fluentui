'use client';

import type * as React from 'react';
import { useLabel as useLabelBase } from '@fluentui/react-headless-components-preview/label';
import type { LabelProps, LabelState } from './Label.types';

/**
 * Create the state required to render Label.
 */
export const useLabel = (props: LabelProps, ref: React.Ref<HTMLLabelElement>): LabelState => {
  const { size = 'medium', weight = 'regular', ...rest } = props;
  const state = useLabelBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-size': size,
      'data-weight': weight,
    },
    size,
    weight,
  };
};
