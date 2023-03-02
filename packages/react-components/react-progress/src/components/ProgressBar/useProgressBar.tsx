import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
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

  const internalMax = max !== undefined && max <= 0 ? 1 : max;
  //const internalValue = value && value > internalMax ? internalMax : value && value < 0 ? 0 : value;
  const internalValue = value && value < 0 ? 0 : value && value > internalMax ? internalMax : value;

  if (process.env.NODE_ENV !== 'production') {
    if (value && max <= 0) {
      // eslint-disable-next-line no-console
      console.error(`The prop 'max' must be greater than 0. Received max: ${max}`);
    }
    if (value && value < 0) {
      // eslint-disable-next-line no-console
      console.error(`The prop 'value' must be greater than or equal to zero. Received value: ${value}`);
    }
    if (value && value > max) {
      // eslint-disable-next-line no-console
      console.error(`The prop 'value' must be less than or equal to 'max'. Received  value: ${value}, max: ${max}`);
    }
  }

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
