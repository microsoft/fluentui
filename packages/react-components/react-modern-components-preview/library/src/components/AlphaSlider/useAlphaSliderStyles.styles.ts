'use client';

import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AlphaSliderSlots, AlphaSliderState } from './AlphaSlider.types';
import { colorSliderClassNames, useColorSliderStyles } from '../ColorSlider/useColorSliderStyles.styles';
import styles from './AlphaSlider.module.css';

export const alphaSliderClassNames: SlotClassNames<AlphaSliderSlots> = {
  root: 'fui-AlphaSlider',
  rail: 'fui-AlphaSlider__rail',
  thumb: 'fui-AlphaSlider__thumb',
  input: 'fui-AlphaSlider__input',
};

export const useAlphaSliderStyles = (state: AlphaSliderState): AlphaSliderState => {
  useColorSliderStyles(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(alphaSliderClassNames.root, styles.root, state.root.className);
  // eslint-disable-next-line react-hooks/immutability
  state.rail.className = clsx(alphaSliderClassNames.rail, styles.rail, state.rail.className);
  // eslint-disable-next-line react-hooks/immutability
  state.thumb.className = clsx(alphaSliderClassNames.thumb, styles.thumb, state.thumb.className);
  // eslint-disable-next-line react-hooks/immutability
  state.input.className = clsx(alphaSliderClassNames.input, colorSliderClassNames.input, state.input.className);
  return state;
};
