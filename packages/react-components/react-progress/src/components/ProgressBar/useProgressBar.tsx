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
  const { max = 1.0, shape = 'rounded', thickness = 'medium', validationState, value } = props;

  const root = getNativeElementProps('div', {
    ref,
    role: 'progressbar',
    'aria-valuemin': value !== undefined ? 0 : undefined,
    'aria-valuemax': value !== undefined ? max : undefined,
    'aria-valuenow': value,
    ...props,
  });

  const bar = resolveShorthand(props.bar, {
    required: true,
  });

  const state: ProgressBarState = {
    max,
    shape,
    thickness,
    value,
    validationState,
    components: {
      root: 'div',
      bar: 'div',
    },
    root,
    bar,
  };

  return state;
};
