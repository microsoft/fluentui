'use client';

import type * as React from 'react';
import { useAlphaSliderBase_unstable } from '@fluentui/react-color-picker';
import type { AlphaSliderProps, AlphaSliderState } from './AlphaSlider.types';
import { stringifyDataAttribute } from '../../../utils';

export const useAlphaSlider = (props: AlphaSliderProps, ref: React.Ref<HTMLInputElement>): AlphaSliderState => {
  const state: AlphaSliderState = useAlphaSliderBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-channel'] = state.channel;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-orientation'] = state.vertical ? 'vertical' : 'horizontal';
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-transparency'] = stringifyDataAttribute(props.transparency);

  return state;
};
