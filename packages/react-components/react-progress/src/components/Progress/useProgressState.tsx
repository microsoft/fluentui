import type { ProgressState, ProgressProps } from './Progress.types';
import { progressCssVars } from './useProgressStyles';

// if the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios
const ZERO_THRESHOLD = 0.01;

export const useProgressState_unstable = (state: ProgressState, props: ProgressProps) => {
  const { percentComplete = -1 } = props;

  const determinate = percentComplete > -1 ? true : false;

  const valuePercent = determinate ? Math.min(100, Math.max(0, percentComplete)) : undefined;

  const progressBarStyles = {
    [`${progressCssVars.percentageCssVar}`]: determinate ? valuePercent + '%' : '0',
    [`${progressCssVars.transitionCssVar}`]:
      valuePercent && determinate && valuePercent < ZERO_THRESHOLD ? 'none' : 'width .3s ease',
  };

  const ariaValueMin = determinate ? 0 : undefined;
  const ariaValueMax = determinate ? 100 : undefined;
  const ariaValueNow = determinate ? Math.floor(percentComplete!) : undefined;

  if (state.indicator) {
    state.indicator.style = {
      ...progressBarStyles,
      ...state.indicator.style,
    };
    state.indicator['aria-valuemin'] = ariaValueMin;
    state.indicator['aria-valuemax'] = ariaValueMax;
    state.indicator['aria-valuenow'] = ariaValueNow;
  }
  //return state;
};
