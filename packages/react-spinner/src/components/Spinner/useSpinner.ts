import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { SpinnerProps, SpinnerState, SpinnerRender } from './Spinner.types';
import { renderSpinner_unstable } from './renderSpinner';

/**
 * Create the state required to render Spinner.
 *
 * The returned state can be modified with hooks such as useSpinnerStyles_unstable,
 * before being passed to renderSpinner_unstable.
 *
 * @param props - props from this instance of Spinner
 * @param ref - reference to root HTMLElement of Spinner
 */
export const useSpinner_unstable = (
  props: SpinnerProps,
  ref: React.Ref<HTMLElement>,
): [SpinnerState, SpinnerRender] => {
  const state: SpinnerState = {
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

  return [state, renderSpinner_unstable];
};
