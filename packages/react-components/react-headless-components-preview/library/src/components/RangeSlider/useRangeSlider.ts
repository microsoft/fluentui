'use client';

import type * as React from 'react';
import { useRangeSliderBase_unstable } from '@fluentui/react-range-slider-preview';

import type { RangeSliderProps, RangeSliderState } from './RangeSlider.types';
import { toDataAttributeValue } from '../../utils';

/**
 * Returns the state for a RangeSlider component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderRangeSlider`.
 */
export const useRangeSlider = (props: RangeSliderProps, ref: React.Ref<HTMLDivElement>): RangeSliderState => {
  const state: RangeSliderState = useRangeSliderBase_unstable(props, ref);

  // Set data attributes after the base hook resolves consumer slot props, so they always reflect the real state.
  /* eslint-disable react-hooks/immutability */
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  state.root['data-vertical'] = toDataAttributeValue(state.vertical);
  state.startThumb['data-disabled'] = toDataAttributeValue(state.startDisabled);
  state.startThumb['data-active'] = toDataAttributeValue(state.activeThumb === 'start');
  state.endThumb['data-disabled'] = toDataAttributeValue(state.endDisabled);
  state.endThumb['data-active'] = toDataAttributeValue(state.activeThumb === 'end');
  /* eslint-enable react-hooks/immutability */

  return state;
};
