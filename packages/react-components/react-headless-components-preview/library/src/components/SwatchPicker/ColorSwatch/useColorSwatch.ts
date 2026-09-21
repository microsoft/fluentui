'use client';

import type * as React from 'react';
import { useColorSwatchBase_unstable } from '@fluentui/react-swatch-picker';
import { toDataAttributeValue } from '../../../utils';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';

export const useColorSwatch = (props: ColorSwatchProps, ref: React.Ref<HTMLButtonElement>): ColorSwatchState => {
  const state: ColorSwatchState = useColorSwatchBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selected'] = toDataAttributeValue(state.selected);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);

  return state;
};
