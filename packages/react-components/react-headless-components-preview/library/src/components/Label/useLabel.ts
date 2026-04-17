'use client';

import type * as React from 'react';
import { useLabelBase_unstable } from '@fluentui/react-label';

import type { LabelProps, LabelState } from './Label.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a Label component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderLabel`.
 */
export const useLabel = (props: LabelProps, ref: React.Ref<HTMLLabelElement>): LabelState => {
  'use no memo';

  const state: LabelState = useLabelBase_unstable(props, ref);

  // Set data attribute for disabled state to simplify styling.
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);

  return state;
};
