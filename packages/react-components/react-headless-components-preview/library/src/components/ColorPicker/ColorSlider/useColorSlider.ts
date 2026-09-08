'use client';

import type * as React from 'react';
import { useColorSliderBase_unstable } from '@fluentui/react-color-picker';
import type { ColorSliderProps, ColorSliderState } from './ColorSlider.types';

export const useColorSlider = (props: ColorSliderProps, ref: React.Ref<HTMLInputElement>): ColorSliderState => {
  const state: ColorSliderState = useColorSliderBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-channel'] = state.channel;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-orientation'] = state.vertical ? 'vertical' : 'horizontal';

  return state;
};
