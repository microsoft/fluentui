'use client';

import type * as React from 'react';
import { useLabelBase_unstable } from '@fluentui/react-label';

import type { LabelProps, LabelState } from './Label.types';

/**
 * Returns the state for a Label component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderLabel`.
 */
export const useLabel = (props: LabelProps, ref: React.Ref<HTMLLabelElement>): LabelState => {
  const state = useLabelBase_unstable(props, ref);

  return state;
};
