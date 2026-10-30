import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RangeSliderState, RangeSliderSlots } from './RangeSlider.types';
import styles from './RangeSlider.module.css';

export const rangeSliderClassNames: SlotClassNames<RangeSliderSlots> = {
  root: 'fui-RangeSlider',
  rail: 'fui-RangeSlider__rail',
  startThumb: 'fui-RangeSlider__startThumb',
  endThumb: 'fui-RangeSlider__endThumb',
  startInput: 'fui-RangeSlider__startInput',
  endInput: 'fui-RangeSlider__endInput',
};

export const useRangeSliderStyles_unstable = (state: RangeSliderState): RangeSliderState => {
  state.root.className = clsx(
    rangeSliderClassNames.root,
    styles.root,
    styles[state.size ?? 'medium'],
    state.vertical ? styles.vertical : styles.horizontal,
    state.disabled ? styles.disabled : styles.enabled,
    state.root.className,
  );
  state.rail.className = clsx(rangeSliderClassNames.rail, styles.rail, state.rail.className);
  const thumbsOverlap = state.value.start === state.value.end;
  state.startThumb.className = clsx(
    rangeSliderClassNames.startThumb,
    styles.startThumb,
    state.startDisabled && styles.disabled,
    thumbsOverlap && state.activeThumb === 'start' && styles.active,
    state.startThumb.className,
  );
  state.startInput.className = clsx(
    rangeSliderClassNames.startInput,
    styles.startInput,
    state.startDisabled && styles.disabled,
    state.startInput.className,
  );
  state.endThumb.className = clsx(
    rangeSliderClassNames.endThumb,
    styles.endThumb,
    state.endDisabled && styles.disabled,
    thumbsOverlap && state.activeThumb === 'end' && styles.active,
    state.endThumb.className,
  );
  state.endInput.className = clsx(
    rangeSliderClassNames.endInput,
    styles.endInput,
    state.endDisabled && styles.disabled,
    state.endInput.className,
  );
  return state;
};
