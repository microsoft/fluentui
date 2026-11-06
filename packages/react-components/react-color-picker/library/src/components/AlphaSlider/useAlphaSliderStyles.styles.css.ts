'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AlphaSliderSlots, AlphaSliderState } from './AlphaSlider.types';
import { useColorSliderStyles_unstable } from '../ColorSlider/useColorSliderStyles.styles.css';
import styles from './AlphaSlider.module.css';

export const alphaSliderClassNames: SlotClassNames<AlphaSliderSlots> = {
  root: 'fui-AlphaSlider',
  rail: 'fui-AlphaSlider__rail',
  thumb: 'fui-AlphaSlider__thumb',
  input: 'fui-AlphaSlider__input',
};

export const useAlphaSliderStyles_unstable = (state: AlphaSliderState): AlphaSliderState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    alphaSliderClassNames.root,
    state.vertical ? styles.vertical : styles.horizontal,
    state.root.className,
  );
  // eslint-disable-next-line react-hooks/immutability
  state.input.className = clsx(alphaSliderClassNames.input, state.input.className);
  // eslint-disable-next-line react-hooks/immutability
  state.rail.className = clsx(alphaSliderClassNames.rail, styles.rail, state.rail.className);
  // eslint-disable-next-line react-hooks/immutability
  state.thumb.className = clsx(alphaSliderClassNames.thumb, styles.thumb, state.thumb.className);
  useColorSliderStyles_unstable(state);
  return state;
};
