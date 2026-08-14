'use client';

import type * as React from 'react';
import { useEmptySwatchBase_unstable } from '@fluentui/react-swatch-picker';
import { stringifyDataAttribute } from '../../../utils';
import type { EmptySwatchProps, EmptySwatchState } from './EmptySwatch.types';

export const useEmptySwatch = (props: EmptySwatchProps, ref: React.Ref<HTMLButtonElement>): EmptySwatchState => {
  const state: EmptySwatchState = useEmptySwatchBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selected'] = stringifyDataAttribute(state.root['aria-checked']);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = stringifyDataAttribute(state.root.disabled);

  return state;
};
