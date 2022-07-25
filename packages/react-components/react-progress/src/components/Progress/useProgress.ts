import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
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
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
