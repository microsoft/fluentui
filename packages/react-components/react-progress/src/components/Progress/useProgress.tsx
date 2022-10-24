import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { ProgressProps, ProgressState } from './Progress.types';

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

  const state: ProgressState = {
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
