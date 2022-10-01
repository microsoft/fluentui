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
  const { thickness = 'medium', value, max = 1.0 } = props;

  const root = getNativeElementProps('div', { ref, role: 'progressbar', ...props });

  const bar = resolveShorthand(props.bar, {
    required: true,
    defaultProps: {
      'aria-valuemin': value ? 0 : undefined,
      'aria-valuemax': value ? max : undefined,
      'aria-valuenow': value,
    },
  });

  const state: ProgressState = {
    max,
    thickness,
    value,
    components: {
      root: 'div',
      bar: 'div',
    },
    root,
    bar,
  };

  return state;
};
