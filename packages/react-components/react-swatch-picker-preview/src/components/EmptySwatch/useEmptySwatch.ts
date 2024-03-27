import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { EmptySwatchProps, EmptySwatchState } from './EmptySwatch.types';

/**
 * Create the state required to render EmptySwatch.
 *
 * The returned state can be modified with hooks such as useEmptySwatchStyles_unstable,
 * before being passed to renderEmptySwatch_unstable.
 *
 * @param props - props from this instance of EmptySwatch
 * @param ref - reference to root HTMLDivElement of EmptySwatch
 */
export const useEmptySwatch_unstable = (props: EmptySwatchProps, ref: React.Ref<HTMLDivElement>): EmptySwatchState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
