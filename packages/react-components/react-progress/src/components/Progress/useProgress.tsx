import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import type { ProgressProps, ProgressState } from './Progress.types';
import { Label } from '@fluentui/react-label';
import { progressCssVars } from './useProgressStyles';

// If the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios.
const ZERO_THRESHOLD = 0.01;

/**
 * Create the state required to render Progress.
 *
 * The returned state can be modified with hooks such as useProgressStyles_unstable,
 * before being passed to renderProgress_unstable.
 *
 * @param props - props from this instance of Progress
 * @param ref - reference to root HTMLElement of Progress
 */
export const useProgress_unstable = (props: ProgressProps, ref: React.Ref<HTMLElement>): ProgressState => {
  // Props
  const { barThickness = 'default', determinate = false, percentComplete } = props;
  const ariaValueMin = determinate ? 0 : undefined;
  const ariaValueMax = determinate ? 100 : undefined;
  const ariaValueNow = determinate ? Math.floor(percentComplete! * 100) : undefined;
  const baseId = useId('Progress');
  const describedbyId = useId('ProgressDescription');

  const valuePercent = determinate ? Math.min(100, Math.max(0, percentComplete! * 100)) : undefined;
  const progressBarStyles = {
    [`${progressCssVars.percentageCssVar}`]: determinate ? valuePercent + '%' : '0',
    [`${progressCssVars.transitionCssVar}`]:
      valuePercent && determinate && valuePercent < ZERO_THRESHOLD ? 'none' : 'width .3s ease',
  };

  const { role = 'progressbar', ...rest } = props;
  const nativeRoot = getNativeElementProps('div', { ref, role, ...rest });

  const labelShorthand = resolveShorthand(props.label, {
    defaultProps: {
      id: baseId,
    },
    required: false,
  });

  const descriptionShorthand = resolveShorthand(props.description, {
    defaultProps: {
      id: describedbyId,
    },
    required: false,
  });

  const barShortHand = resolveShorthand(props.bar, {
    required: true,
    defaultProps: {
      'aria-valuemin': ariaValueMin,
      'aria-valuemax': ariaValueMax,
      'aria-valuenow': ariaValueNow,
    },
  });

  const trackShortHand = resolveShorthand(props.track, {
    required: true,
    defaultProps: {},
  });

  if (labelShorthand && nativeRoot && !nativeRoot['aria-labelledby']) {
    nativeRoot['aria-labelledby'] = labelShorthand.id;
  }

  const state: ProgressState = {
    barThickness,
    determinate,
    components: {
      root: 'div',
      bar: 'div',
      track: 'div',
      label: Label,
      description: Label,
    },
    root: nativeRoot,
    bar: barShortHand,
    track: trackShortHand,
    label: labelShorthand,
    description: descriptionShorthand,
  };

  if (state.bar && determinate) {
    state.bar.style = {
      ...progressBarStyles,
      ...state.bar.style,
    };
  }

  //useProgressState_unstable(state, props);
  return state;
};
