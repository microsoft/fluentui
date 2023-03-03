import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { clampValue, clampMax } from '../../utils/index';
import type { ProgressBarProps, ProgressBarState } from './ProgressBar.types';

/**
 * Create the state required to render ProgressBar.
 *
 * The returned state can be modified with hooks such as useProgressBarStyles_unstable,
 * before being passed to renderProgressBar_unstable.
 *
 * @param props - props from this instance of ProgressBar
 * @param ref - reference to root HTMLElement of ProgressBar
 */
export const useProgressBar_unstable = (props: ProgressBarProps, ref: React.Ref<HTMLElement>): ProgressBarState => {
  // Props
  const { color = 'brand', max = 1, shape = 'rounded', thickness = 'medium', value } = props;
  const internalMax = clampMax(max);
  const internalValue = clampValue(value, internalMax);

  const root = getNativeElementProps('div', {
    ref,
    role: 'progressbar',
    'aria-valuemin': internalValue !== undefined ? 0 : undefined,
    'aria-valuemax': internalValue !== undefined ? internalMax : undefined,
    'aria-valuenow': internalValue,
    ...props,
  });

  const bar = resolveShorthand(props.bar, {
    required: true,
  });

  const state: ProgressBarState = {
    color,
    max: internalMax,
    shape,
    thickness,
    value: internalValue,
    components: {
      root: 'div',
      bar: 'div',
    },
    root,
    bar,
  };

  return state;
};
